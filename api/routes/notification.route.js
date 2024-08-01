import express from 'express';
import { getDueClients, updateNotificationStatus } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', getDueClients);
router.patch('/:clientId', updateNotificationStatus);

export default router;
