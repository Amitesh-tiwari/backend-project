import  Router  from "express";
import registerUser from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middlewares.js";
import loginUser from "../controllers/user.controller.js";
import  {verifyJWT}  from "../middlewares/auth.middleware.js";
import logoutUser from "../controllers/user.controller.js";

const router = Router()

router.post("/register"),(req,res) => {
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),

    res.send(registerUser);
};

router.post("/login", (req, res) => {
    res.send(loginUser);
});

router.post("/logout", verifyJWT, (req, res) => {
    res.send(logoutUser);
});

export default router; 