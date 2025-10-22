import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/users.service.ts"; 

export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await registerUser(name, email, password, role);
        res.status(201).json({ message: "Usuario registrado con éxito", user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const loginController = async ( req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.status(200).json(result);
    } catch(err: any) {
        res.status(400).json({ error: err.message })
    }
}