import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

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

    res.status(200).json({ success: true, projects });
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

    const { title, description, githubURL, figmaURL, websiteURL, techUsed } =
      req.body;

    const imgURL = req.file ? req.file.path : null;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure techUsed is always an array of strings
    let techArray = [];
    if (Array.isArray(techUsed)) {
      techArray = techUsed;
    } else if (typeof techUsed === "string") {
      techArray = techUsed
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
    }

    const newProject = new Project({
      title,
      description,
      imgURL,
      githubURL,
      figmaURL,
      websiteURL,
      techUsed: techArray,
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

    const { title, description, githubURL, figmaURL, websiteURL, techUsed } =
      req.body;

    const imgURL = req.file ? req.file.path : req.body.imgURL;

    const project = await Project.findOne({ _id: projectId, user: userId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Prepare updated fields only if changed
    const updatedFields = {};
    if (title && title !== project.title) updatedFields.title = title;
    if (description && description !== project.description)
      updatedFields.description = description;
    if (imgURL && imgURL !== project.imgURL) updatedFields.imgURL = imgURL;
    if (githubURL && githubURL !== project.githubURL)
      updatedFields.githubURL = githubURL;
    if (figmaURL && figmaURL !== project.figmaURL)
      updatedFields.figmaURL = figmaURL;
    if (websiteURL && websiteURL !== project.websiteURL)
      updatedFields.websiteURL = websiteURL;
    let techArray = [];
    if (Array.isArray(techUsed)) {
      techArray = techUsed;
    } else if (typeof techUsed === "string") {
      techArray = techUsed
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    if (
      techArray.length &&
      JSON.stringify(techArray) !== JSON.stringify(project.techUsed)
    ) {
      updatedFields.techUsed = techArray;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      { $set: updatedFields },
      { new: true }
    );

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

    if (project.imgURL) {
      const filePath = path.resolve("uploads", path.basename(project.imgURL));
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete image file:", err.message);
        } else {
          console.log("Image file deleted:", filePath);
        }
      });
    }

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
