import React from "react";

function Navbar({ className }) {
  return (
    <div className="p-6 bg-gradient-to-b from-[#000D1A] to-primary flex justify-end sm:justify-center">
      <ul className={`flex flex-row gap-10 text-white pr-5 ${className}`}>
        <li className="hover:text-secondary">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-secondary">
          <a href="#project">Projects</a>
        </li>
        <li className="hover:text-secondary">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
