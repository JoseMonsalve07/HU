import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// middleware general: verifica si el token es valido
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("Headers recibidos:", req.headers.authorization);

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "No se proporcionó token" });
        }

        // el token viene como: "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Token no válido" });
        }

        // verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // guardamos los datos del usuario en la request para usarlos después
        (req as any).user = decoded;

        next();
    } catch(err: any) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export const checkRole = (roles: string[]) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if(!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
        }

        next();
    }
}