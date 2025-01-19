import { Router } from 'express';
import { OrderController } from '../../../../application/interfaces/controllers/OrderController';

const router = Router();

export default (controller: OrderController) => {
  router.post('/orders', controller.create.bind(controller));
  router.get('/orders', controller.list.bind(controller));
  router.get('/orders/:id', controller.getById.bind(controller));
  router.put('/orders/:id', controller.update.bind(controller));
  router.delete('/orders/:id', controller.delete.bind(controller));

  return router;
};