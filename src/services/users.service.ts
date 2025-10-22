import { User } from "../models/users.model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (name: string, email: string, password: string, role: "admin" | "seller") => {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("El usuario ya existe");

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });
    return newUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if(!user) throw new Error("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return { token, role: user.role, name: user.name }
}
