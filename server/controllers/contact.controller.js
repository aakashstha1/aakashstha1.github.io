import Contact from "../models/contact.model.js";

// --------------------------------------------Get Contact--------------------------------------------------

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.findOne();

    if (!contacts) {
      return res.status(404).json({
        success: false,
        message: "Contact section not found",
      });
    }
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Filed to fetch contact!" });
  }
};

// --------------------------------------------Update Contact--------------------------------------------------

export const updateContact = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, address, mobile, education } = req.body;

    let contact = await Contact.findOne({ user: userId });

    if (!contact) {
      const newContact = new Contact({
        name,
        email,
        address,
        mobile,
        education,
        user: userId,
      });

      const savedContact = await newContact.save();

      return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: savedContact,
      });
    }

    // Build the update object with only changed fields
    const updatedData = {};
    if (name && name !== contact.name) updatedData.name = name;
    if (email && email !== contact.email) updatedData.email = email;
    if (address && address !== contact.address) updatedData.address = address;
    if (mobile && mobile !== contact.mobile) updatedData.mobile = mobile;
    if (education && education !== contact.education)
      updatedData.education = education;

    if (Object.keys(updatedData).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes detected",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contact._id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
