import { Request, Response, NextFunction } from "express";

export const authenticateAPIKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header("x-api-key");

  if (auth !== process.env.API_KEY) {
    return res.status(401).send({ success: false, reason: "Invalid API Key" });
  } else {
    next();
  }
};
