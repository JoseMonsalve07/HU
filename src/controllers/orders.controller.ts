import { OrdersService } from "../services/orders.service.ts";

export const ordersService = new OrdersService();

export const registerOrderController = async (userId: number, items: { productId: number; quantity: number }[]) => {
    return await ordersService.registerOrder(userId, items);
};