import Client from '../models/client.model.js';
import { errorHandler } from '../utils/error.js';

export const createClient = async (req, res, next) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return next(errorHandler(404, 'Client not found!'));
    res.status(200).json(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json('Client has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return next(errorHandler(404, 'Client not found!'));
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};
