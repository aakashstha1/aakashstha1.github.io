import Link from "../models/link.model.js";

// --------------------------------------------Get Links--------------------------------------------------

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find();

    if (!links) {
      return res.status(404).json({
        success: false,
        message: "Links not found",
      });
    }

    res.status(200).json({
      success: true,
      data: links[0],
    });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch links",
    });
  }
};

// --------------------------------------------Update Links--------------------------------------------------

export const updateLinks = async (req, res) => {
  try {
    const userId = req.userId;
    const { fbURL, email, instaURL, linkedinURL, githubURL } = req.body;

    let link = await Link.findOne({ user: userId });

    // If not found, create new
    if (!link) {
      const newLink = new Link({
        fbURL,
        email,
        instaURL,
        linkedinURL,
        githubURL,
        user: userId,
      });

      const savedLink = await newLink.save();

      return res.status(201).json({
        success: true,
        message: "Links created successfully",
        data: savedLink,
      });
    }

    // Prepare update only if changed
    const updatedData = {};
    if (fbURL && fbURL !== link.fbURL) updatedData.fbURL = fbURL;
    if (email && email !== link.email) updatedData.email = email;
    if (instaURL && instaURL !== link.instaURL) updatedData.instaURL = instaURL;
    if (linkedinURL && linkedinURL !== link.linkedinURL)
      updatedData.linkedinURL = linkedinURL;
    if (githubURL && githubURL !== link.githubURL)
      updatedData.githubURL = githubURL;

    if (Object.keys(updatedData).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedLink = await Link.findByIdAndUpdate(
      link._id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Links updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    console.error("Error updating links:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
