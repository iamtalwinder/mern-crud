import express, { Router } from 'express';
import authRouter from './auth.routes';
import vehicleRouter from './vehicle.routes';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/vehicle', vehicleRouter);

export default router;
