import axios from "axios";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
function Intro() {
  const [introData, setIntroData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const downloadRef = useRef(null);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-intro`);
        setIntroData(res?.data?.data);
      } catch (error) {
        console.error("Failed to fetch intro:", error);
      }
    };
    fetchIntro();
  }, []);

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  const fileName = introData.resume
    ? decodeURIComponent(introData.resume.split("/").pop())
    : "resume.pdf";

  return (
    <div className="h-[90vh] bg-primary flex flex-col items-start justify-center gap-8 p-6 sm:h-full">
      <h1 className="text-white text-xl font-bold">{introData.welcomeText}</h1>
      <h1 className="text-secondary text-7xl sm:text-3xl font-semibold">
        {introData.firstName} {introData.lastName}
      </h1>
      <h1 className="text-white text-5xl sm:text-3xl font-semibold">
        {introData.caption}
      </h1>

      <p className="text-white w-2/3 text-justify leading-6">
        {introData.description}
      </p>

      {introData.resume && (
        <div className="m-2">
          <Button
            text={"Open Resume"}
            className="w-52 flex justify-center"
            onClick={handleDownload}
          />
        </div>
      )}
      <a
        ref={downloadRef}
        href={introData.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        download={fileName}
      >
        Click
      </a>
    </div>
  );
}

export default Intro;
