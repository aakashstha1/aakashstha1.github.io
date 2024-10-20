import SectionTitle from "./SectionTitle";
import PropTypes from "prop-types";

Project.propTypes = {
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Project({ projectData }) {
  return (
    <div id="project">
      <SectionTitle title="Projects" />
      <div className="py-10">
        <div className="container mx-auto p-10 backdrop-blur-md bg-silver bg-opacity-30 shadow-lg rounded-lg">
          <div className="grid grid-cols-4 sm:grid-cols-1 gap-8">
            {projectData.map((project) => (
              <div
                key={project._id}
                className="relative group rounded-lg overflow-hidden"
              >
                <img
                  src={project.imgURL}
                  alt={`Project: ${project.title}`}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col gap-5 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-4 text-center">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  {/* <p className="text-white text-sm mb-4">
                    {project.description}
                  </p> */}
                  <a
                    href={`/project-details/${project._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary px-6 py-3 rounded-lg font-semibold"
                  >
                    View &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
