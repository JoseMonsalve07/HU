import { Order } from '../models/orders.model.ts';
import { Product } from '../models/products.model.ts';
import { User } from '../models/users.model.ts';

export class OrdersService {
    /**
     * Registra un pedido, valida stock y reduce inventario automáticamente.
     * Uso sencillo: registerOrder(userId, [{ productId: 1, quantity: 2 }, ...])
     */
    async registerOrder(userId: number, items: { productId: number; quantity: number }[]): Promise<Order> {
        // validar usuario
        const user = await User.findByPk(userId);
        if (!user) throw new Error('Usuario no encontrado');

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

        // crear pedido según el modelo Order
        const order = await Order.create({
            clientId: user.id,      // cliente asociado (ajusta si es distinto)
            userId: user.id,        // usuario que registra el pedido (ajústalo si procede)
            orderDate: new Date(),
            totalAmount: total
        });

        // reducir inventario
        for (const item of items) {
            const product = productsMap.get(item.productId)!;
            product.stock = (product.stock ?? 0) - item.quantity;
            await product.save();
        }

        return order;
    }
}
