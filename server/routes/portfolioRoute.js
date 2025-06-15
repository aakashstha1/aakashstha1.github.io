const router = require("express").Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
  Link,
} = require("../models/portfolioModel");

const User = require("../models/user.model");


//get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const experiences = await Experience.find();
    const contact = await Contact.find();
    const links = await Link.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      experiences: experiences,
      contact: contact[0],
      link: links[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update intro
router.post("/update-intro", async (req, res) => {
  try {
    const { _id, welcomeText, firstName, lastName, caption, description } =
      req.body;

    let updatedData = {
      welcomeText,
      firstName,
      lastName,
      caption,
      description,
    };


    // Update the intro document in the database
    const intro = await Intro.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });

    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    console.error("Error updating intro:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});
//update about
// Define the POST route to update "About" section data
router.post("/update-about", async (req, res) => {
  try {
    // Attempt to find and update the document in the "About" collection
    // Use the _id from the request body to identify the document
    // `new: true` ensures the response will contain the updated document
    const about = await About.findOneAndUpdate(
      { _id: req.body._id }, // Filter by the document's _id
      req.body, // Update with the new data from the request
      { new: true } // Return the updated document after the update
    );

    // Send a successful response back to the client
    res.status(200).send({
      data: about, // Include the updated document in the response
      success: true, // Indicate the operation was successful
      message: "About updated successfully", // Provide a success message
    });
  } catch (error) {
    // If an error occurs, log it and send a 500 response
    console.error("Error updating about:", error);
    res.status(500).send(error); // Return the error object for debugging
  }
});

//add experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience deleted succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added succesfully",
    });z
  } catch (error) {
    res.status(500).send(error);
  }
});

//update project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete project
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleted succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Admin Login
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure username and password from the request body

    // Find the user with matching username and password
    const user = await User.findOne({ username, password });
    user.password = "";
    if (user) {
      // If user is found, send success response
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successful",
      });
    } else {
      // If user not found, send error response
      res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    // Catch any unexpected errors
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});




// Get project details by ID
router.get("/project-details/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  // const projecdID = req.params.id;  //this is same as above
  try {
    const project = await Project.findById(id); // Find project by ID

    if (project) {
      res.status(200).send(project);
    } else {
      res.status(404).send({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching project", error });
  }
});

//update Links
router.post("/update-url", async (req, res) => {
  try {
    console.log(req.body);
    const link = await Link.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });
    res.status(200).send({
      data: link,
      success: true,
      message: "URL update succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
