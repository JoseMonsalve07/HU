import { registerOrderController, getOrders } from "../controllers/orders.controller.ts";
import { Router } from "express";
import { checkRole, verifyToken } from "../middlewares/auth.middleware.ts";

const ordersRouter = Router();

ordersRouter.post("/", verifyToken, checkRole(["admin", "seller"]), async (req, res) => {
    try {
        const { userId, items } = req.body;
        const order = await registerOrderController(userId, items);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
);

ordersRouter.get('/', verifyToken, checkRole(["admin", "seller"]), getOrders);

export default ordersRouter;