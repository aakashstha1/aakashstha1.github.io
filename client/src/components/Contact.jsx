import SectionTitle from "./SectionTitle";
import PropTypes from "prop-types";

Contact.propTypes = {
  contactData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
  }).isRequired,
};

function Contact({ contactData }) {
  return (
    <div id="contact">
      <SectionTitle title="Contact" />
      <div className="flex sm:flex-col items-center justify-between sm:gap-10">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">{`{`}</p>
          {Object.keys(contactData).map(
            (key) =>
              key !== "_id" && (
                <p key={key} className="mb-4 ml-5">
                  <span className="text-secondary">{key}:</span>
                  <span className="text-secondary ml-2">
                    {contactData[key]}
                  </span>
                </p>
              )
          )}
          <p className="text-secondary">{`}`}</p>
        </div>
        <div>
          <img
            src="../src/assets/images/contact.png"
            alt="Contact"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
