// controllers/notification.controller.js

import Client from '../models/client.model.js';

export const getDueClients = async (req, res) => {
  try {
    const clients = await Client.find({ notified: true }).sort({ dueDate: 1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
