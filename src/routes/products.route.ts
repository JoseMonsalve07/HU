import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.ts";
import { checkRole, verifyToken } from "../middlewares/auth.middleware.ts";

const productsRouter = Router();

productsRouter.get('/', verifyToken, checkRole(["admin", "seller"]), getAllProducts);
productsRouter.post('/', verifyToken, checkRole(["admin", "seller"]), createProduct);
productsRouter.put('/:id', verifyToken, checkRole(["admin", "seller"]), updateProduct);
productsRouter.delete('/:id', verifyToken, checkRole(["admin", "seller"]), deleteProduct);

export default productsRouter;