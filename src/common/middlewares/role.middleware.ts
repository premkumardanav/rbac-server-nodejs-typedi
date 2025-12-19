import { UserRole } from "../../enums/UserRole.ts";

export const authorize =
  (...allowed: UserRole[]) =>
  (req: any, res: any, next: any) => {
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    next();
  };
