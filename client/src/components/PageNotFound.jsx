import Lottie from "lottie-react";
import pageNotFound from "../assets/lottie/pageNotFound.json";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <Lottie
        animationData={pageNotFound}
        loop={true}
        style={{ width: "100%", maxWidth: "900px", height: "auto" }}
      />
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-primary text-secondary px-6 py-3 rounded shadow-md hover:opacity-90"
      >
        Go Back
      </button>
    </div>
  );
}

export default PageNotFound;
