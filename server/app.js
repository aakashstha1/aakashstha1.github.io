import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import portfolioRoutes from "./routes/portfolio.routes.js";

dotenv.config({});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Api's

app.use("/api", portfolioRoutes);

export default app;
