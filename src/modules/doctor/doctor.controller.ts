import { Router } from "express";
import { Container } from "typedi";
import { DoctorService } from "./doctor.service.ts";
import { authenticate } from "../../common/middlewares/auth.middleware.ts";
import { authorize } from "../../common/middlewares/role.middleware.ts";
import { UserRole } from "../../enums/UserRole.ts";
import {
  CreatePatientReq,
  UpdatePatientReq,
  AssignNurseReq,
} from "./doctor.dto.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Doctor
 *     description: Doctor endpoints (manage patients)
 */

/**
 * @swagger
 * /doctor/patients:
 *   post:
 *     tags:
 *       - Doctor
 *     summary: Create a patient assigned to the authenticated doctor
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePatient'
 *     responses:
 *       201:
 *         description: Patient created
 */
router.post(
  "/patients",
  authenticate,
  authorize(UserRole.DOCTOR),
  async (req, res) => {
    try {
      const svc = Container.get(DoctorService);
      const user = (req as any).user as any;
      const body = req.body as CreatePatientReq;
      const created = await svc.createPatient(
        user.id,
        body.name,
        body.diagnosis
      );
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /doctor/patients/{id}:
 *   put:
 *     tags:
 *       - Doctor
 *     summary: Update a patient owned by the authenticated doctor
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePatient'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  "/patients/:id",
  authenticate,
  authorize(UserRole.DOCTOR),
  async (req, res) => {
    try {
      const svc = Container.get(DoctorService);
      const user = (req as any).user as any;
      const body = req.body as UpdatePatientReq;
      const updated = await svc.updatePatient(
        user.id,
        req.params.id,
        body as any
      );
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /doctor/patients/{id}/assign-nurse:
 *   post:
 *     tags:
 *       - Doctor
 *     summary: Assign a nurse to a patient (doctor must own patient)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nurseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nurse assigned
 */
router.post(
  "/patients/:id/assign-nurse",
  authenticate,
  authorize(UserRole.DOCTOR),
  async (req, res) => {
    try {
      const svc = Container.get(DoctorService);
      const user = (req as any).user as any;
      const body = req.body as AssignNurseReq;
      const result = await svc.assignNurse(
        user.id,
        req.params.id,
        body.nurseId
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
