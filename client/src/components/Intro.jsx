import axios from "axios";
import Button from "./Button";
import { useEffect, useState } from "react";

function Intro() {
  const [introData, setIntroData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchIntro = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-intro`);
      setIntroData(res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch intro:", error);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  return (
    <div className="h-[90vh] bg-primary flex flex-col items-start justify-center gap-8 p-6">
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

      <Button text="Download CV" className="w-52 m-2 flex justify-center" />
    </div>
  );
}

export default Intro;
