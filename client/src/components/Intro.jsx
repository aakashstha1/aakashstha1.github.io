import Button from "./Button";
import PropTypes from "prop-types";

Intro.propTypes = {
  introData: PropTypes.shape({
    welcomeText: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

function Intro({ introData }) {
  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8">
      <h1 className="text-white text-xl font-bold">{introData.welcomeText}</h1>
      <h1 className="text-secondary text-7xl sm:text-3xl font-semibold">
        {introData.firstName} {introData.lastName}
      </h1>
      <h1 className="text-white text-5xl sm:text-3xl font-semibold">
        {introData.caption}
      </h1>

      <p className="text-white w-2/3 text-justify">{introData.description}</p>
      <Button text="Get started" />
    </div>
  );
}

export default Intro;
