import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminContact from "./AdminContact";
import Links from "./Links";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  // Track the active tab key using useState
  const [activeTabKey, setActiveTabKey] = useState("1");

  // Load the saved active tab key on component mount
  useEffect(() => {
    const savedTabKey = localStorage.getItem("activeTabKey");
    if (savedTabKey) {
      setActiveTabKey(savedTabKey);
    }
  }, []);

  // Save the active tab key when it changes
  const onChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem("activeTabKey", key);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "./admin-login";
    }
  }, []);

  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experience",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Project",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Contact",
      children: <AdminContact />,
    },
    {
      key: "6",
      label: "Links",
      children: <Links />,
    },
  ];

  return (
    <>
      <div className="bg-primary p-1">
        <h1 className="text-tubeLight-effect text-3xl mt-5 justify-center tracking-[8px] text-center relative">
          Admin Dashboard
        </h1>
      </div>
      <div className="absolute top-8 right-10 cursor-pointer">
        <h1
          className="text-secondary"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout &nbsp; <i className="fa-solid fa-right-from-bracket"></i>
        </h1>
      </div>
      {portfolioData && (
        <div className="p-5">
          <Tabs activeKey={activeTabKey} items={items} onChange={onChange} />
        </div>
      )}
    </>
  );
}

export default Admin;
