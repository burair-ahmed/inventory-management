import express from 'express';
import { createAdmin, assignListing } from '../controllers/superadmin.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { verifySuperAdmin } from '../utils/verifyRole.js';

const router = express.Router();

router.post('/create-admin', verifyToken, verifySuperAdmin, createAdmin);
router.post('/assign-listing', verifyToken, verifySuperAdmin, assignListing);

export default router;
