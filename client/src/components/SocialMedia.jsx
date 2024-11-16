import PropTypes from "prop-types";

SocialMedia.propTypes = {
  links: PropTypes.shape({
    fbURL: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    instaURL: PropTypes.string.isRequired,
    linkedinURL: PropTypes.string.isRequired,
    githubURL: PropTypes.string.isRequired,
  }).isRequired,
};

function SocialMedia({ links }) {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center ">
        <div className="flex flex-col gap-4 sm:flex-row sm:mb-5">
          <a href={links.fbURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook text-xl text-silver hover:text-white cursor-pointer"></i>
          </a>
          <a
            href={`mailto:${links.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-regular fa-envelope text-xl text-silver hover:text-white cursor-pointer"></i>
          </a>
          <a href={links.instaURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram text-xl text-silver hover:text-white cursor-pointer"></i>
          </a>
          <a href={links.linkedinURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin text-xl text-silver hover:text-white cursor-pointer"></i>
          </a>
          <a href={links.githubURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github text-xl text-silver hover:text-white cursor-pointer"></i>
          </a>
        </div>
        <div className="w-[1px] h-52 bg-slate-600 mt-2 sm:hidden"></div>
      </div>
    </div>
  );
}

export default SocialMedia;
