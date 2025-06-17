import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
// import SingleProject from "../components/SingleProject";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home/Home";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin/login" element={<Login />} />
        {/* <Route path="admin/forgot-password" element={<Login />} />
        <Route path="admin/reset-password" element={<Login />} /> */}
        <Route path="admin/dashboard" element={<Dashboard />} />
        {/* <Route path="project/:projectId" element={<SingleProject />} />  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
