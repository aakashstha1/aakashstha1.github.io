import express from "express";
import {
  login,
  logout,
  register,
  updatePassword,
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = express.Router();

router.route("/admin/register").post(register);

router.route("/admin/login").post(login);
router.route("/admin/logout").post(logout);
router.route("/admin/update").put(authentication, updatePassword);

export default router;
