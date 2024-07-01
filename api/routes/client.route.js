import express from 'express';
import { createClient, updateClient, deleteClient, getClient, getClients } from '../controllers/client.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { verifySuperAdmin } from '../utils/verifyRole.js';

const router = express.Router();

router.post('/', verifyToken, verifySuperAdmin, createClient);
router.put('/:id', verifyToken, verifySuperAdmin, updateClient);
router.delete('/:id', verifyToken, verifySuperAdmin, deleteClient);
router.get('/:id', verifyToken, getClient);
router.get('/', verifyToken, getClients);

export default router;
