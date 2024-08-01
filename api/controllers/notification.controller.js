// controllers/notification.controller.js

import Client from '../models/client.model.js';

export const getDueClients = async (req, res) => {
  try {
    const today = new Date();
    const clients = await Client.find({ dueDate: { $lte: today }, notified: false }).sort({ dueDate: 1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { notified } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.notified = notified;
    await client.save();

    res.status(200).json({ message: 'Notification status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
