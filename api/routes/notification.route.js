// routes/notification.route.js

import express from 'express';
import { getDueClients } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', getDueClients);

export default router;