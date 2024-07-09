import Client from '../models/client.model.js';
import { errorHandler } from '../utils/error.js';

export const createClient = async (req, res, next) => {
  const { name, plot, block, amountPaid, amountDue } = req.body;
  const newClient = new Client({
    name,
    plot,
    block,
    amountPaid,
    amountDue,
    userRef: req.user.id,
  });

  try {
    await newClient.save();
    res.status(201).json('Client profile created successfully!');
  } catch (error) {
    console.error('Error creating client:', error);
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return next(errorHandler(404, 'Client not found!'));

    if (req.user.role !== 'superadmin' && req.user.id !== client.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own clients!'));
    }

    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return next(errorHandler(404, 'Client not found!'));

    if (req.user.role !== 'superadmin' && req.user.id !== client.userRef.toString()) {
      return next(errorHandler(401, 'You can only delete your own clients!'));
    }

    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json('Client profile deleted successfully!');
  } catch (error) {
    next(error);
  }
};

export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id).populate('userRef', 'username');
    if (!client) return next(errorHandler(404, 'Client not found!'));
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ userRef: req.user.id }).populate('userRef', 'username');
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

export const getAllClientsForSuperAdmin = async (req, res, next) => {
  try {
    const clients = await Client.find().populate('userRef', 'username');
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};