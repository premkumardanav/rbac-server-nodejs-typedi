import { Router } from "express";
import { Container } from "typedi";
import { NurseService } from "./nurse.service.ts";
import { authenticate } from "../../common/middlewares/auth.middleware.ts";
import { authorize } from "../../common/middlewares/role.middleware.ts";
import { UserRole } from "../../enums/UserRole.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Nurse
 *     description: Nurse endpoints (view assigned patients, create patients)
 */

/**
 * @swagger
 * /nurse/patients:
 *   get:
 *     tags:
 *       - Nurse
 *     summary: Get all patients assigned to the authenticated nurse
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of assigned patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get(
  "/patients",
  authenticate,
  authorize(UserRole.NURSE),
  async (req, res) => {
    try {
      const svc = Container.get(NurseService);
      const user = (req as any).user as any;
      const patients = await svc.getAssignedPatients(user.id);
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;

