import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.ts";

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;