import type { Request, Response } from 'express';
import { getAllClientsService, createClientService, updateClientService, deleteClientService } from '../services/clients.service.ts';

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await getAllClientsService();
        res.status(200).json(clients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createClient = async (req: Request, res: Response) => {
    try {
        const newClient = await createClientService(req.body);
        res.status(201).json(newClient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const updatedClient = await updateClientService(Number(req.params.id), req.body);
        res.status(200).json(updatedClient);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const result = await deleteClientService(Number(req.params.id));
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
