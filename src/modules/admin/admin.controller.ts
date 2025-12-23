import { Router } from "express";
import { Container } from "typedi";
import { AdminService } from "./admin.service.ts";
import { authenticate } from "../../common/middlewares/auth.middleware.ts";
import { authorize } from "../../common/middlewares/role.middleware.ts";
import { UserRole } from "../../enums/UserRole.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Administrative endpoints (manage users and patients)
 */

/**
 * @swagger
 * /admin/users:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a doctor or nurse
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["doctor", "nurse"]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post(
  "/users",
  authenticate,
  authorize(UserRole.ADMIN),
  async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const service = Container.get(AdminService);
      const created = await service.createUser(email, password, role);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a doctor or nurse
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete(
  "/users/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  async (req, res) => {
    try {
      const service = Container.get(AdminService);
      await service.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /admin/patients/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete patient record
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete(
  "/patients/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  async (req, res) => {
    try {
      const service = Container.get(AdminService);
      await service.deletePatient(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

/**
 * @swagger
 * /admin/users/email/{email}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get user details by email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email address
 *     responses:
 *       200:
 *         description: User details (password excluded)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                   format: email
 *                 role:
 *                   type: string
 *                   enum: ["admin", "doctor", "nurse"]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.get(
  "/users/email/:email",
  authenticate,
  authorize(UserRole.ADMIN),
  async (req, res) => {
    try {
      const service = Container.get(AdminService);
      const user = await service.getUserByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

export default router;
