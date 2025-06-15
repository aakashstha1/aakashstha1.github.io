import Experience from "../models/experience.model.js";
import User from "../models/user.model.js";

// --------------------------------------------Add Experience--------------------------------------------------

export const addExperience = async (req, res) => {
  try {
    const userId = req.userId;

    const { title, period, company, description } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newExperience = new Experience({
      title,
      period,
      company,
      description,
      user: userId,
    });

    const savedExperience = await newExperience.save();

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: savedExperience,
    });
  } catch (error) {
    console.error("Error adding experience:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add experience",
    });
  }
};

// --------------------------------------------Get Experiences--------------------------------------------------

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();

    if (!experiences) {
      return res.status(404).json({
        success: false,
        message: "Experiences not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
};

// --------------------------------------------Update Experience--------------------------------------------------

export const updateExperience = async (req, res) => {
  try {
    const { expId } = req.params;
    const userId = req.userId;

    const { title, period, company, description } = req.body;

    const experience = await Experience.findOne({
      _id: expId,
      user: userId,
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Update fields only if they're different
    const updatedFields = {};
    if (title && title !== experience.title) updatedFields.title = title;
    if (period && period !== experience.period) updatedFields.period = period;
    if (company && company !== experience.company)
      updatedFields.company = company;
    if (description && description !== experience.description)
      updatedFields.description = description;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      experience._id,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Error updating experience:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

// --------------------------------------------Delete Experience--------------------------------------------------

export const deleteExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { expId } = req.params;

    const deletedExperience = await Experience.findOneAndDelete({
      _id: expId,
      user: userId,
    });

    if (!deletedExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting experience:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};
