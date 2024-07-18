// utils/notificationService.js

import schedule from 'node-schedule';
import Client from '../models/client.model.js';
import { sendNotification } from './notification.js';

const sendDueDateNotifications = async () => {
  try {
    const today = new Date();
    console.log(`Checking due dates for notifications at: ${today}`);

    // Find clients whose due date is today and who haven't been notified yet
    const clients = await Client.find({ dueDate: { $lte: today }, notified: false });

    if (clients.length > 0) {
      console.log(`Found ${clients.length} clients with due dates today.`);
      clients.forEach(async (client) => {
        client.notified = true;
        await client.save();
        // Send notification to the client's email
        sendNotification(client.email, `Rent due for ${client.name} on ${client.dueDate}`);
        console.log(`Notification sent for client: ${client.name}`);
      });
    } else {
      console.log('No clients found with due dates today.');
    }
  } catch (error) {
    console.error('Error sending due date notifications:', error);
  }
};

// Schedule the task to run every day at midnight
schedule.scheduleJob('0 0 * * *', sendDueDateNotifications);

export { sendDueDateNotifications };
