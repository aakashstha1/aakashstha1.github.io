import About from "../models/about.model.js";

// --------------------------------------------Get About--------------------------------------------------

export const getAbout = async (req, res) => {
  try {
    const abouts = await About.findOne();

    if (!abouts) {
      return res.status(404).json({
        success: false,
        message: "About section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: abouts,
    });
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch about section",
    });
  }
};

// --------------------------------------------Update or Create About--------------------------------------------------

export const updateAbout = async (req, res) => {
  try {
    const userId = req.userId;
    const { description1, description2, skills } = req.body;

    let about = await About.findOne({ user: userId });

    // If not found, create new
    if (!about) {
      const newAbout = new About({
        description1,
        description2,
        skills,
        user: userId,
      });

      const savedAbout = await newAbout.save();

      return res.status(201).json({
        success: true,
        message: "About section created successfully",
        data: savedAbout,
      });
    }

    about.description1 = description1 || about.description1;
    about.description2 = description2 || about.description2;
    if (
      skills &&
      Array.isArray(skills) &&
      JSON.stringify(skills) !== JSON.stringify(about.skills)
    ) {
      about.skills = skills;
    }

    const savedAbout = await about.save();

    res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: savedAbout,
    });
  } catch (error) {
    console.error("Error updating about:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
