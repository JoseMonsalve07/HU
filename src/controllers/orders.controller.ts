import type { Request, Response } from 'express';
import { OrdersService } from '../services/orders.service.ts';

const ordersService = new OrdersService();

export const registerOrderController = async (userId: number, items: { productId: number; quantity: number }[]) => {
    return await ordersService.registerOrder(userId, items);
};

export async function getOrders(req: Request, res: Response) {
    try {
        const clientId = req.query.clientId ? Number(req.query.clientId) : undefined;
        const productId = req.query.productId ? Number(req.query.productId) : undefined;

        const filter: { clientId?: number; productId?: number } = {};
        if (clientId !== undefined) filter.clientId = clientId;
        if (productId !== undefined) filter.productId = productId;

        const orders = await ordersService.getOrders(filter);
        return res.json(orders);
    } catch (err: any) {
        return res.status(500).json({ message: err.message || 'Error obteniendo pedidos' });
    }
}