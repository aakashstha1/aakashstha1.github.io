import Lottie from "lottie-react";

import loading from "../assets/lottie/loading.json";

import { BeatLoader } from "react-spinners";

function ScreenLoader() {
  return (
    <div className="bg-primary h-screen w-full flex flex-col items-center justify-center">
      <Lottie
        animationData={loading}
        loop={true}
        style={{ width: 160, height: 160 }}
      />
      <BeatLoader color="#40E0D0" size={20} />
    </div>
  );
}

export default ScreenLoader;
