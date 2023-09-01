import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/signup', UserController.create);
router.post('/signing', UserController.sginin);

export const UserRoutes = router;
