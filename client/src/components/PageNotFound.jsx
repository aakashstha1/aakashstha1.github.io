import React from "react";

function PageNotFound() {
  const BackgroundImage = ({ imageUrl, children }) => {
    return (
      <div
        className="bg-contain  bg-center bg-no-repeat h-[70vh] w-full flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="pt-20">
      <BackgroundImage imageUrl="/404.gif">
        <h1 className="text-[#ee9403] font-extrabold text-5xl text-center absolute top-0">
          <span className="text-[#ec7804]">404 Error : </span> Page Not Found.
        </h1>
        <div className="flex flex-col justify-center items-center mt-96">
          <p className="text-[#ee9403] text-xl mb-6 text-center font-serif font-semibold">
            The page you&apos;re looking for might have been removed, or is
            temporarily unavailable.
          </p>
          <a
            href="/"
            className="bg-[#39ad31] text-white py-3 px-5 border-3 border-[#efefef] hover:bg-[#56c44e]"
          >
            Home
          </a>
        </div>
      </BackgroundImage>
    </div>
  );
}

export default PageNotFound;
