import express from 'express';
import { checkRole } from '../controllers/user.controller.js';
import { deleteUser, test, updateUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/check-role', verifyToken, checkRole);
router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;
