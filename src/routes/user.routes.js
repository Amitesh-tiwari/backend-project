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

router.route("/refresh-token").post((req, res) => {
    res.send(refreshAccessToken);
});

router.route("/change-password").post(verifyJWT, (req, res) => {
    res.send(changePassword); 
});

router.route("/current-user").get(verifyJWT, (req, res) => {
    res.send(getCurrentUser);
});

router.route("/update-account").patch(verifyJWT, (req, res) => {
    res.send(updateAccountDetails);
});

router.route("/avatar").patch(verifyJWT,upload.single("avatar"), (req, res) => {
    res.send(updateUserAvatar);
});

router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"), (req, res) => {
    res.send(updateUserCoverImage);
});

router.route("/c/.username").get(verifyJWT, (req, res) => {
    res.send(getUserChannelProfile);
});

router.route("/history").get(verifyJWT, (req, res) => {
    res.send(getWatchHistory);
});

export default router; 