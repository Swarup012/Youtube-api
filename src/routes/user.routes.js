import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUserDetails,
  userAvatarUpdate,
  userCoverImgUpdate,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/cuurent-user").get(verifyJWT, getCurrentUser);

router.route("/update-accout").patch(verifyJWT, updateCurrentUserDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), userAvatarUpdate);

router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), userCoverImgUpdate);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);
export default router;
