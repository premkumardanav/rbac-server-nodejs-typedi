import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/datasource.ts";
import { User } from "../../entities/User.ts";
import { JWT_SECRET } from "../../config/env.ts";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach safely to request
    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
