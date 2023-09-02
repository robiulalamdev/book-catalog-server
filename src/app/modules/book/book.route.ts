import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.create
);

router.get('/', BookController.getAll);
router.get('/:id', BookController.getSingle);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.update
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteSingle);

export const BookRoutes = router;
