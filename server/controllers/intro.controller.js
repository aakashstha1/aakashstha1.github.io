import Intro from "../models/intro.model.js";

// --------------------------------------------Get Intro--------------------------------------------------

export const getIntro = async (req, res) => {
  try {
    const intros = await Intro.find();

    if (!intros) {
      return res.status(404).json({
        success: false,
        message: "Intro section not found",
      });
    }
    res.status(200).json({ success: true, data: intros[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Filed to fetch intro!" });
  }
};

// --------------------------------------------Update Intro--------------------------------------------------

export const updateIntro = async (req, res) => {
  try {
    const userId = req.userId;
    const { welcomeText, firstName, lastName, caption, description } = req.body;

    // Try to find an existing intro
    let intro = await Intro.findOne({ user: userId });

    // If not found, create new one
    if (!intro) {
      const newIntro = new Intro({
        welcomeText,
        firstName,
        lastName,
        caption,
        description,
        user: userId,
      });

      const savedIntro = await newIntro.save();

      return res.status(201).json({
        success: true,
        message: "Intro created successfully",
        data: savedIntro,
      });
    }

    // Build the update object with only changed fields
    const updatedData = {};
    if (welcomeText && welcomeText !== intro.welcomeText)
      updatedData.welcomeText = welcomeText;
    if (firstName && firstName !== intro.firstName)
      updatedData.firstName = firstName;
    if (lastName && lastName !== intro.lastName)
      updatedData.lastName = lastName;
    if (caption && caption !== intro.caption) updatedData.caption = caption;
    if (description && description !== intro.description)
      updatedData.description = description;

    if (Object.keys(updatedData).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedIntro = await Intro.findByIdAndUpdate(
      intro._id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Intro updated successfully",
      data: updatedIntro,
    });
  } catch (error) {
    console.error("Error updating intro:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
