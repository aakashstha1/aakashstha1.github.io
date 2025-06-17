import { useState, useEffect } from "react";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import { useAuth } from "../../context/AuthContext";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
// import AdminContact from "./AdminContact";
import Links from "./Links";

function Dashboard() {
  // Track the active tab key using useState
  const [activeTabKey, setActiveTabKey] = useState("1");
  const { user } = useAuth();
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
        <h1>setting </h1>
      </div>
      {user && (
        <div className="p-5">
          <Tabs activeKey={activeTabKey} items={items} onChange={onChange} />
        </div>
      )}
    </>
  );
}

export default Dashboard;
