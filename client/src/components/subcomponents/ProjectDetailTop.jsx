import React from "react";
import { Image } from "antd";
import SectionTitle from "../SectionTitle";

function ProjectDetailTop({ project }) {
  return (
    <div>
      <div className="flex flex-col gap-5 ">
        {/* Top div */}
        <div className="flex gap-6">
          {/* Top left div */}
          <div className="w-1/3 h-80 rounded-lg overflow-hidden border-2 border-[rgba(255,255,255,0.5)] border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <Image
              width={400}
              height={320}
              src={project.imgURL}
              alt={project.title}
              className="object-cover w-full h-full border-2 border-[rgba(255,255,255,0.5)] "
            />
          </div>

          {/* Top right div */}
          <div className="w-2/3 bg-[rgba(255,255,255,0.1)] rounded-lg shadow-[0_25px_45px_rgba(0,0,0,0.2)] backdrop-blur-[10px] border-2 border-[rgba(255,255,255,0.5)] border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)] p-5">
            <h1 className="text-secondary text-3xl font-bold">
              {project.title}
            </h1>
            <hr />
            <div className="flex gap-6 py-5">
              <button className="bg-secondary text-white px-3 py-2 font-semibold flex justify-center items-center rounded-md">
                Github &nbsp; <i className="fa-brands fa-github text-xl"></i>
              </button>
              <button className="bg-secondary text-white px-3 py-2 font-semibold flex justify-center items-center rounded-md">
                Figma &nbsp; <i className="fa-brands fa-figma text-xl"></i>
              </button>
              <button className="bg-secondary text-white px-3 py-2 font-semibold flex justify-center items-center rounded-md">
                Website &nbsp;<i className="fa-solid fa-globe text-xl"></i>
              </button>
            </div>
            <hr />
            <h1 className="text-white font-bold text-xl pt-5">
              Technology Used:
            </h1>
          </div>
        </div>

        {/* Description div  */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-lg shadow-[0_25px_45px_rgba(0,0,0,0.2)] backdrop-blur-[10px] border-2 border-[rgba(255,255,255,0.5)] border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)] p-5">
          <SectionTitle title="Description" />

          <SectionTitle title="Key Features" />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailTop;
