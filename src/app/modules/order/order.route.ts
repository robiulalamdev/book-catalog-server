import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.create),
  OrderController.create
);

// router.get('/', BookController.getAll);
// router.get('/:id', BookController.getSingle);

// router.get('/:categoryId/category', BookController.getAllByCate);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   validateRequest(BookValidation.update),
//   BookController.update
// );

// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteSingle);

export const OrderRoutes = router;
