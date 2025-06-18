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
    const { welcomeText, firstName, lastName, caption, description, resume } =
      req.body;

    let intro = await Intro.findOne({ user: userId });

    // If not found, create new one
    if (!intro) {
      const newIntro = new Intro({
        welcomeText,
        firstName,
        lastName,
        caption,
        description,
        resume,
        user: userId,
      });

      const savedIntro = await newIntro.save();

      return res.status(201).json({
        success: true,
        message: "Intro created successfully",
        data: savedIntro,
      });
    }

    intro.welcomeText = welcomeText || intro.welcomeText;
    intro.firstName = firstName || intro.firstName;
    intro.lastName = lastName || intro.lastName;
    intro.caption = caption || intro.caption;
    intro.description = description || intro.description;
    intro.resume = resume || intro.resume;

    const savedIntro = await intro.save();

    res.status(200).json({
      success: true,
      message: "Intro updated successfully",
      data: savedIntro,
    });
  } catch (error) {
    console.error("Error updating intro:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
