import { Router } from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, getAllListingsForSuperAdmin, checkPlotNumber } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { verifyAdminOrSuperAdmin, verifySuperAdmin } from '../utils/verifyRole.js';

const router = Router();

router.post('/create', verifyToken, verifyAdminOrSuperAdmin, createListing);
router.delete('/delete/:id', verifyToken, verifyAdminOrSuperAdmin, deleteListing);
router.post('/update/:id', verifyToken, verifyAdminOrSuperAdmin, updateListing);
router.get('/get/:id', verifyToken, getListing);  // This route is updated to populate lister's name
router.get('/get', verifyToken, getListings);
router.get('/superadmin/get', verifyToken, verifySuperAdmin, getAllListingsForSuperAdmin);  // This route is updated to populate lister's name

// New route to check plot number
router.get('/check/:plot', verifyToken, checkPlotNumber);

export default router;
