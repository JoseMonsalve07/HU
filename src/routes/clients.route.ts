import { Router } from "express";
import { getAllClients, createClient, updateClient, deleteClient } from "../controllers/clients.controller.ts";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.ts";

const clientstsRouter = Router();

clientstsRouter.get('/', verifyToken, checkRole(["admin", "seller"]), getAllClients);
clientstsRouter.post('/', verifyToken, checkRole(["admin", "seller"]), createClient);
clientstsRouter.put('/:id', verifyToken, checkRole(["admin", "seller"]), updateClient);
clientstsRouter.delete('/:id', verifyToken, checkRole(["admin", "seller"]), deleteClient);

export default clientstsRouter;