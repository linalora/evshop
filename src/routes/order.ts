import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../security";
import {
  createOrder,
  findOrderById,
  findOrders,
} from "../services/order.service";
const router = express.Router();

router.get("/:id", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const order = await findOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});
router.get("/", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const orders = await findOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.post("/", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

export { router as orderRouter };
