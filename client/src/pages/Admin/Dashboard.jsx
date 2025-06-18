import { useState, useEffect } from "react";
import { Tabs, Dropdown, Menu } from "antd";
import AdminIntro from "./AdminIntro";
import { useAuth } from "../../context/AuthContext";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
// import AdminContact from "./AdminContact";
import Links from "./Links";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../Auth/ChangePassword";

function Dashboard() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const { user, logout } = useAuth();
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const navigate = useNavigate();
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

  const handelLogout = async () => {
    const res = await logout();
    if (res.success) {
      navigate("/admin/login");
    } else {
      console.error("Logout failed:", res.error);
    }
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

  // const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handelLogout();
    } else if (key === "changePassword") {
      setChangePasswordVisible(true);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="changePassword">Change Password</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="bg-primary p-1">
        <h1 className="text-tubeLight-effect text-3xl mt-5 justify-center tracking-[8px] text-center relative">
          Admin Dashboard
        </h1>
      </div>
      <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
        <div className="absolute top-8 right-10 cursor-pointer">
          <SettingOutlined className="text-white" />
        </div>
      </Dropdown>
      {user && (
        <div className="p-5">
          <Tabs activeKey={activeTabKey} items={items} onChange={onChange} />
        </div>
      )}
      <ChangePassword
        open={changePasswordVisible}
        onClose={() => setChangePasswordVisible(false)}
      />
    </>
  );
}

export default Dashboard;
