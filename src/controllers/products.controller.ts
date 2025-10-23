import type { Request, Response } from "express";
import { getAllProductsService, createProductService, deleteProductService, updateProductService } from "../services/products.service.ts";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await createProductService(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await updateProductService(Number(req.params.id), req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await deleteProductService(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};