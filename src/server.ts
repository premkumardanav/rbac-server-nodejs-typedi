import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/datasource.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authController from "./modules/auth/auth.controller.js";
import adminController from "./modules/admin/admin.controller.js";
import doctorController from "./modules/doctor/doctor.controller.js";
import { PORT } from "./config/env.js";

await AppDataSource.initialize();

const app = express();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      displayOperationId: false,
      filter: false,
      defaultModelsExpandDepth: -1,
    },
  })
);

app.use("/auth", authController);
app.use("/admin", adminController);
app.use("/doctor", doctorController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
