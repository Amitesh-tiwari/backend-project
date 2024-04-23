import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
//route is set as register and the method is post


export default router; 