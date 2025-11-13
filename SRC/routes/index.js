import express from 'express';
import authRoutes from './authRoutes.js';
import companyRoutes from './companyRoutes.js';
import vehicleRoutes from './vehicleRoutes.js';
import publicTripRoutes from './publicTripRoutes.js';
import subscriberRoutes from './subscriberRoutes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/company', companyRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/trips', publicTripRoutes);
router.use('/subscribe', subscriberRoutes);
export default router;