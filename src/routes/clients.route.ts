import { Router } from "express";
import { getAllClients, createClient, updateClient, deleteClient } from "../controllers/clients.controller.ts";

const clientstsRouter = Router();

clientstsRouter.get('/', getAllClients);
clientstsRouter.post('/', createClient);
clientstsRouter.put('/:id', updateClient);
clientstsRouter.delete('/:id', deleteClient);

export default clientstsRouter;