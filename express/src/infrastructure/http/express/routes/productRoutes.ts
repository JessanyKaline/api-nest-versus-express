import { Router } from "express";
import { ProductController } from "../../../../application/interfaces/controllers/ProductController";

const router = Router();
export default (controller: ProductController) => {
  router.post("/products", controller.create.bind(controller));
  router.get("/products", controller.list.bind(controller));
  router.get("/products/:id", controller.getById.bind(controller));
  router.put("/products/:id", controller.update.bind(controller));
  router.delete("/products/:id", controller.delete.bind(controller));

  return router;
};
