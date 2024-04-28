import  Router  from "express";
import registerUser from "../controllers/user.controller.js";
import upload from "./../middlewares/multer.middlewares.js";
import loginUser from "../controllers/user.controller.js";
import  {verifyJWT}  from "../middlewares/auth.middleware.js";
import logoutUser from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post((req, res,next) => {
    upload.fields([
        {
            "name": "avatar",
            "maxCount": 1
        },
        {
            "name": "coverImage",
            "maxCount": 1
        }
    ]);
    registerUser(req, res,next);
});
//route is set as register and the method is post

router.route("/login").post((req, res,next) => {
    loginUser;
});




//secured Routes
router.route("logout").post((req1,res,next) => {
    verifyJWT;
    logoutUser;
});

export default router; 