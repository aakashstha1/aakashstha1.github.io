import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Admin/Dashboard";
// import SingleProject from "../components/SingleProject";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin/login" element={<Login />} />
        <Route path="admin/forgot-password" element={<ForgotPassword />} />
        <Route path="admin/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="project/:projectId" element={<SingleProject />} />  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
