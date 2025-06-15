import express from "express";
import {
  login,
  logout,
  register,
  updatePassword,
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/authentication.js";
import { getIntro, updateIntro } from "../controllers/intro.controller.js";
import { getAbout, updateAbout } from "../controllers/about.controller.js";
import {
  getContact,
  updateContact,
} from "../controllers/contact.controller.js";
import { getLinks, updateLinks } from "../controllers/link.controller.js";

const router = express.Router();

//Admin routes
router.route("/admin/register").post(register);
router.route("/admin/login").post(login);
router.route("/admin/logout").post(logout);
router.route("/admin/update").put(authentication, updatePassword);

//Intro routes
router.route("/get-intro").get(getIntro);
router.route("/update-intro").put(authentication, updateIntro);

//About routes
router.route("/get-about").get(getAbout);
router.route("/update-about").put(authentication, updateAbout);

//Contact routes
router.route("/get-contact").get(getContact);
router.route("/update-contact").put(authentication, updateContact);

//Links routes
router.route("/get-links").get(getLinks);
router.route("/update-links").put(authentication, updateLinks);

export default router;
