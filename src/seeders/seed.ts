import { User } from "../models/users.model.ts";
import { Product } from "../models/products.model.ts";
import bcrypt from "bcrypt";

export const runSeeds = async () => {
  try {
    // Comprobamos si ya existen usuarios
    const userCount = await User.count();
    if (userCount > 0) {
      console.log("Ya existen datos, no se ejecutaron seeds.");
      return;
    }

    console.log("Ejecutando seeds...");

    const passwordHash = await bcrypt.hash("123456", 10);

    // Usuarios de ejemplo
    await User.bulkCreate([
        { name: "Admin", email: "admin@mail.com", password: passwordHash, role: "admin" },
        { name: "Seller One", email: "seller@mail.com", password: passwordHash, role: "seller" },
    ]);

    // Productos de ejemplo
    await Product.bulkCreate([
        { code: "P001", name: "Product 1", description: "Description for Product 1", price: 10.99, stock: 100 },
        { code: "P002", name: "Product 2", description: "Description for Product 2", price: 15.49, stock: 150 },
        { code: "P003", name: "Product 3", description: "Description for Product 3", price: 7.99, stock: 200 },
    ]);

    console.log("✅ Seeds completados correctamente");
  } catch (error) {
    console.error("❌ Error ejecutando seeds:", error);
  }
};
