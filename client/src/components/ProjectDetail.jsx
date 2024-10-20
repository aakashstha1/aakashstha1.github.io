import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import SocialMedia from "./SocialMedia";
import Navbar from "./Navbar";
import ProjectDetailTop from "./subcomponents/ProjectDetailTop";
import { useDispatch, useSelector } from "react-redux";
import { SetProjectData } from "../redux/rootSlice";
import { useNavigate } from "react-router-dom";

function ProjectDetail() {
  const { projectData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate();

  // Function to fetch project data by ID
  const getProjectData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/portfolio/project-details/${id}`
      );
      console.log(response.data);
      dispatch(SetProjectData(response.data));
    } catch (error) {
      navigate("/page-not-found");
      console.error("Error fetching project data:", error);
    }
  };

  // Fetch project data on component mount or when ID changes
  useEffect(() => {
    getProjectData();
  }, [id]);

  // Ensure the project data is available before rendering
  if (!projectData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar className="invisible" />
      <div className="bg-primary px-40 sm:px-5">
        <div className="flex flex-col gap-5 ">
          <ProjectDetailTop project={projectData} />
        </div>
        <Footer />
        <SocialMedia />
      </div>
    </div>
  );
}

export default ProjectDetail;
