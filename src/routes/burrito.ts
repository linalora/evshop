import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../security";
import {
  createBurrito,
  findBurritoById,
  findBurritos,
} from "../services/burrito.service";
const router = express.Router();

router.get("/:id", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const burrito = await findBurritoById(req.params.id);
    res.status(200).json(burrito);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.get("/", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const burritos = await findBurritos();
    res.status(200).json(burritos);
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
});

router.post("/", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    const burrito = await createBurrito(req.body);
    res.status(200).json(burrito);
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
});

export { router as burritoRouter };
