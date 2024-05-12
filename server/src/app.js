import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// routes Import
import userRoute from "./routes/user.routes.js";

// route Declaration
app.use("/api/v1/users", userRoute);

export { app };
