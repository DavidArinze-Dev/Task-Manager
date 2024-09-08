import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import express, { response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";
import taskRoute from "./routes/taskRoutes.js";

config();
const app = express();

app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);

mongoose
  .connect(process.env.mongoDb)
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/task", taskRoute);
