import Project from "../models/project.model.js";
import User from "../models/user.model.js";

import { deleteCloudinaryFile } from "../utils/cloudinaryDeletion.js";

// --------------------------------------------Get projects--------------------------------------------------

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      return res.status(404).json({
        success: false,
        message: "Projects not found",
      });
    }

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// --------------------------------------------Get Single Project--------------------------------------------------

export const getSingleProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// --------------------------------------------Add New Projects--------------------------------------------------

export const addProject = async (req, res) => {
  try {
    const userId = req.userId;

    const { title, githubURL, figmaURL, websiteURL } = req.body;

    if (!req.file || !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    const imgURL = req.file.path;
    console.log(req.file);

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure techUsed is always an array of strings
    // let techArray = [];
    // if (Array.isArray(techUsed)) {
    //   techArray = techUsed;
    // } else if (typeof techUsed === "string") {
    //   techArray = techUsed
    //     .split(",")
    //     .map((tech) => tech.trim())
    //     .filter(Boolean);
    // }

    const newProject = new Project({
      title,
      imgURL: req.file.secure_url,
      cloudinaryId: req.file.public_id,
      githubURL,
      figmaURL,
      websiteURL,
      user: userId,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: savedProject,
    });
  } catch (error) {
    console.error("Error adding project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add project",
    });
  }
};

// --------------------------------------------Update Projects--------------------------------------------------

export const updateProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const { title, githubURL, figmaURL, websiteURL } = req.body;

    const imgURL = req.file ? req.file.path : req.body.imgURL;

    const project = await Project.findOne({ _id: projectId, user: userId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.title = title || project.title;
    project.githubURL = githubURL || project.githubURL;
    project.figmaURL = figmaURL || project.figmaURL;
    project.websiteURL = websiteURL || project.websiteURL;
    if (imgURL) project.imgURL = imgURL;

    const updatedProject = await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// --------------------------------------------Delete Projects--------------------------------------------------

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const resourceType = project.imgURL?.endsWith(".pdf") ? "raw" : "image";

    // Call helper to delete file from Cloudinary
    await deleteCloudinaryFile(project.cloudinaryId, resourceType);

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      success: true,
      message: "Project deleted succesfully!",
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
