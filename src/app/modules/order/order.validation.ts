import { z } from 'zod';
import { OrderStatus } from './order.constant';

const create = z.object({
  body: z.object({
    orderedBooks: z.object(
      {
        bookId: z.string({
          required_error: 'Book is Required',
        }),
        quantity: z.number({
          required_error: 'Quantity is Required',
        }),
      },
      {
        required_error: 'Ordered Book is Required',
      }
    ),
    status: z.enum([...OrderStatus] as [string, ...string[]]).optional(),
    userId: z.string({
      required_error: 'User is Required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    orderedBooks: z
      .object({
        bookId: z.string().optional(),
        quantity: z.number().optional(),
      })
      .optional(),
    status: z.enum([...OrderStatus] as [string, ...string[]]).optional(),
    userId: z.string().optional(),
  }),
});

export const OrderValidation = {
  create,
  update,
};
