import axios from "axios";
import { useEffect, useState } from "react";

function SocialMedia() {
  const [links, setLinks] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-links`);
      setLinks(res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch intro:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center ">
        <div className="flex flex-col gap-4 sm:flex-row sm:mb-5">
          <a href={links.fbURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook text-2xl text-silver hover:text-[#1877F2] hover:drop-shadow-[0_0_6px_#1877F2] transition duration-300 cursor-pointer"></i>
          </a>
          <a
            href={`mailto:${links.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-regular fa-envelope text-2xl text-silver hover:text-[#EA4335] hover:drop-shadow-[0_0_6px_#EA4335] transition duration-300 cursor-pointer"></i>
          </a>
          <a href={links.instaURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram text-2xl text-silver hover:text-[#E4405F] hover:drop-shadow-[0_0_6px_#E4405F] transition duration-300 cursor-pointer"></i>
          </a>
          <a href={links.linkedinURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin text-2xl text-silver hover:text-[#0A66C2] hover:drop-shadow-[0_0_6px_#0A66C2] transition duration-300 cursor-pointer"></i>
          </a>
          <a href={links.githubURL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github text-2xl text-silver hover:text-white hover:drop-shadow-[0_0_6px_#ffffff80] transition duration-300 cursor-pointer"></i>
          </a>
        </div>
        <div className="w-[1px] h-52 bg-slate-600 mt-2 sm:hidden"></div>
      </div>
    </div>
  );
}

export default SocialMedia;
