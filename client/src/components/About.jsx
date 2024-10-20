import SectionTitle from "./SectionTitle";
import Button from "./Button";
import PropTypes from "prop-types";

About.propTypes = {
  aboutData: PropTypes.shape({
    imgURL: PropTypes.string.isRequired,
    description1: PropTypes.string.isRequired,
    description2: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
  }).isRequired,
};

function About({ aboutData }) {
  const skills = aboutData.skills || [];

  return (
    <div id="about">
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col ">
        <div className="h-[60vh] w-1/2 flex sm:w-full">
          <img
            src={aboutData.imgURL}
            alt="dev.png"
            width={400}
            height={400}
            className="object-contain sm:object-cover"
          />
        </div>

        <div className="flex flex-col gap-5 w-1/2 text-white p-5 sm:w-full sm:items-center">
          <p className="text-justify">{aboutData.description1}</p>
          <p className="text-justify">{aboutData.description2}</p>
          <Button text="Download CV" className="w-52 m-2 flex justify-center" />
        </div>
      </div>

      <div className="py-10">
        <h1 className="text-silver text-xl mb-4">
          Here are the technologies I&apos;ve been working with:
        </h1>
        <div className="flex flex-wrap gap-10 mt-10">
          {skills.map((skill, index) => (
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
