import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { connectDB } from "./db.js";
import authRouter from "./routes/auth.js";

dotenv.config();

async function bootstrap() {
  await connectDB();

  const app = express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRouter);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 API ready at http://localhost:${port}`));
}

bootstrap();
