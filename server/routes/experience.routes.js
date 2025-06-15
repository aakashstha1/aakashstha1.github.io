import express from "express";
import {
  addExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/experience.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = express.Router();

router.route("/add").post(authentication, addExperience);
router.route("/get").get(getExperiences);
router.route("/update/:expId").put(authentication, updateExperience);
router.route("/:expId").delete(authentication, deleteExperience);

export default router;
