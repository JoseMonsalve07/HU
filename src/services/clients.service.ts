import { Client } from "../models/clients.model.ts";

export const getAllClientsService = async() => {
    return await Client.findAll();
};

export const createClientService = async (data: {name: string, email: string, phone: string}) => {
    const existingClient = await Client.findOne({ where: { email: data.email } });
    if (existingClient) {
        throw new Error('Client with this email already exists');
    }

    const newClient = await Client.create(data);
    return newClient;
};

export const updateClientService = async (id: number, data: Partial<Client>) => {
    const client = await Client.findByPk(id);
    if (!client) {
        throw new Error('Client not found');
    }

    await client.update(data);
    return client;
};

export const deleteClientService = async (id: number) => {
    const client = await Client.findByPk(id);
    if (!client) {
        throw new Error('Client not found');
    }

    await client.destroy();
    return { message: `Client deleted successfully ${client.name}` };
};