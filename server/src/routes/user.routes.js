import { Router } from "express";
import { registerUser, signinUser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signinUser);

export default router;
