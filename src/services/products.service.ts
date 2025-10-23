import { Product } from "../models/products.model.ts";

export const getAllProductsService = async() => {
    return await Product.findAll();
};

export const createProductService = async (data: {code: string, name: string, description: string, price: number, stock: number}) => {
    const existingProduct = await Product.findOne({ where: { code: data.code } });
    if (existingProduct) {
        throw new Error('Product with this code already exists');
    }

    const newProduct = await Product.create(data);
    return newProduct;
};

export const updateProductService = async (id: number, data: Partial<Product>) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }

    await product.update(data);
    return product;
};

export const deleteProductService = async (id: number) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }

    await product.destroy();
    return { message: `Product deleted successfully ${product.name}` };
}