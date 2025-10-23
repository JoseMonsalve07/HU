import { Router } from "express";
import usersRouter from "./users.route.ts";
import productsRouter from "./products.route.ts";
import clientsRouter from "./clients.route.ts";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/clients", clientsRouter);

export default router;