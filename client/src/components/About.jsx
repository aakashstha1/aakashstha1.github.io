import SectionTitle from "./SectionTitle";
// import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import aboutAnimation from "../assets/lottie/about.json";

function About() {
  const [aboutData, setAboutData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-about`);
      setAboutData(res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch intro:", error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <div id="about">
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col ">
        <div className="h-[60vh] w-1/2 flex sm:w-full sm:h-full">
          <Lottie animationData={aboutAnimation} loop={true} />
        </div>

        <div className="flex flex-col gap-5 w-1/2 text-white p-5 sm:w-full sm:items-center ">
          <p className="text-justify">{aboutData.description1}</p>
          <p className="text-justify ">{aboutData.description2}</p>
          {/* <Button
            type="primary"
            className="w-52 m-2 flex justify-center"
            // href={aboutData.resume} // Ensure 'resume' is a valid file URL or path
            // download={`${introData.firstName}_${introData.lastName}_Resume.pdf`}
            text="Download CV"
          /> */}
        </div>
      </div>

      <div className="py-10">
        <h1 className="text-silver text-xl mb-4">
          Here are the technologies I&apos;ve been working with:
        </h1>
        <div className="flex flex-wrap gap-10 mt-10">
          {aboutData?.skills?.map((skill, index) => (
            <div
              key={index}
              className="border border-secondary text-white py-3 px-10 group relative"
            >
              <h1>{skill}</h1>
              <div className="absolute inset-1 blur opacity-75 border "></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
