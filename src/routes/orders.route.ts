import { registerOrderController, getOrders } from "../controllers/orders.controller.ts";
import { Router } from "express";

const ordersRouter = Router();

ordersRouter.post("/register", async (req, res) => {
    try {
        const { userId, items } = req.body;
        const order = await registerOrderController(userId, items);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
);

ordersRouter.get('/', getOrders);

export default ordersRouter;