import { Router } from "express";
import usersRouter from "./users.route.ts";
import productsRouter from "./products.route.ts";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);

export default router;