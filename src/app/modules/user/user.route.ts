import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/signup', UserController.create);

export const UserRoutes = router;
