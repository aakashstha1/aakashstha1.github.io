import { Button } from "antd";
import React from "react";

function Navbar() {
  return (
    <>
      {/* Desktop Nav (≥640px) */}
      <div className="flex sm:hidden p-6 bg-gradient-to-b from-[#000D1A] to-primary justify-end sm:justify-center">
        <ul className="flex flex-row items-center gap-10 text-white pr-5">
          <li className="hover:text-secondary">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-secondary">
            <a href="#experience">Experience</a>
          </li>
          <li className="hover:text-secondary">
            <a href="#project">Projects</a>
          </li>
          <li className="hover:text-secondary">
            <a href="#contact">
              <Button className="font-semibold">Get In Touch</Button>
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Nav (<640px) */}
      <div className="hidden sm:flex p-4 bg-gradient-to-b from-[#000D1A] to-primary justify-end">
        <a href="#contact">
          <Button className="font-semibold">Get In Touch</Button>
        </a>
      </div>
    </>
  );
}

export default Navbar;
