import express from 'express';
import { createClient, updateClient, deleteClient, getClient, getClients, getAllClientsForSuperAdmin, searchClientsByName } from '../controllers/client.controller.js'; // Import the correct function
import { verifyToken } from '../utils/verifyToken.js';
import { verifyAdminOrSuperAdmin, verifySuperAdmin } from '../utils/verifyRole.js';

const router = express.Router();

router.post('/create', verifyToken, verifyAdminOrSuperAdmin, createClient);
router.post('/update/:id', verifyToken, verifyAdminOrSuperAdmin, updateClient);
router.delete('/delete/:id', verifyToken, verifyAdminOrSuperAdmin, deleteClient);
router.get('/get/:id', verifyToken, getClient);
router.get('/get', verifyToken, getClients);
router.get('/superadmin/get', verifyToken, verifySuperAdmin, getAllClientsForSuperAdmin);
router.get('/search', verifyToken, searchClientsByName); // Correct function name

export default router;
