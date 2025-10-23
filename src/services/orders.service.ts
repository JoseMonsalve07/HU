import { Order } from '../models/orders.model.ts';
import { Product } from '../models/products.model.ts';
import { User } from '../models/users.model.ts';
import { Client } from '../models/clients.model.ts';
import { OrderDetail } from '../models/orderDetails.model.ts';
import sequelize from '../dbconfig/database.ts';

export class OrdersService {
    /**
     * Registra un pedido, valida stock y reduce inventario automáticamente.
     * Uso sencillo: registerOrder(userId, [{ productId: 1, quantity: 2 }, ...])
     */
    async registerOrder(userId: number, items: { productId: number; quantity: number }[]): Promise<Order> {
        // validar usuario
        const user = await User.findByPk(userId);
        if (!user) throw new Error('Usuario no encontrado');

        // buscar cliente asociado al usuario; si no existe, crear uno mínimo
        // la columna en la BD es probablemente `user_id` (snake_case).
        // Buscar por el nombre real de columna evita el error "column Client.userId does not exist".
        let client = await Client.findOne({ where: { user_id: user.id } as any });
        if (!client) {
                const clientData: any = {
                user_id: user.id, // usar el nombre de columna real
                name: (user as any).name ?? (user as any).email ?? 'Cliente',
                email: (user as any).email ?? null,
                // phone NO puede ser null según el modelo -> usar fallback
                phone: (user as any).phone ?? '000000000'
            };
            client = await Client.create(clientData);
        }

        // validar items
        if (!items || items.length === 0) throw new Error('El pedido debe contener al menos un item');

        // validar stock y calcular total
        const productsMap = new Map<number, Product>();
        let total = 0;
        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
            if ((product.stock ?? 0) < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${product.name ?? product.id}`);
            }
            productsMap.set(item.productId, product);
            total += (product.price ?? 0) * item.quantity;
        }

        // crear pedido y detalles dentro de una transacción
        const t = await sequelize.transaction();
        try {
            const order = await Order.create({
                clientId: client.id,
                userId: user.id,
                orderDate: new Date(),
                totalAmount: total
            }, { transaction: t });

            // crear detalles de pedido y reducir inventario (atomicamente)
            for (const item of items) {
                const product = productsMap.get(item.productId)!;
                const unitPrice = product.price ?? 0;
                const totalPrice = unitPrice * item.quantity;

                await OrderDetail.create({
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.quantity,
                    unitPrice,
                    totalPrice
                }, { transaction: t });

                product.stock = (product.stock ?? 0) - item.quantity;
                await product.save({ transaction: t });
            }

            await t.commit();
            return order;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    /**
     * Obtiene pedidos, opcionalmente filtrando por cliente y/o producto.
     * filters: { clientId?: number, productId?: number }
     */
    async getOrders(filters: { clientId?: number; productId?: number } = {}): Promise<Order[]> {
        const where: any = {};
        if (filters.clientId) where.clientId = filters.clientId;

        // build include; cuando se filtra por productId, la inclusión del product debe ser "required"
        // Ajustar los atributos 'through' a los nombres reales del modelo OrderDetail.
        // En este proyecto se usan unitPrice / totalPrice (o en la BD unit_price / total_price).
        // Usa los nombres de atributo del modelo (unitPrice, totalPrice). Si tu modelo usa
        // snake_case en la BD sin mapping, cambia a 'unit_price' / 'total_price' aquí.
        const productsInclude: any = {
            model: Product,
            as: 'products',
            attributes: ['id', 'code', 'name', 'price'],
            through: { attributes: ['quantity', 'unitPrice', 'totalPrice'] },
        };
        if (filters.productId) {
            productsInclude.where = { id: filters.productId };
            productsInclude.required = true;
        }

        const include = [
            { model: Client, as: 'client', attributes: ['id', 'name', 'email'] },
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
            productsInclude,
        ];

        const orders = await Order.findAll({
            where,
            include,
            order: [['orderDate', 'DESC']],
        });

        return orders;
    }
}

/*
{
  "userId": 1,
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
*/