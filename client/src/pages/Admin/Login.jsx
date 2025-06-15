import { useState } from "react";
import { message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../../styles/wave.css";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/admin-login",
        user
      );
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="box flex justify-center items-center h-screen bg-primary">
      <form
        onSubmit={login}
        className="w-96 flex gap-3 flex-col shadow border border-gray-400 p-5"
      >
        <h1 className="flex justify-center text-tubeLight-effect py-2">
          Admin Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={user.password}
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)} // Toggle the visibility state
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <i className="fa-solid fa-eye text-primary"></i>
            ) : (
              <i className="fa-solid fa-eye-slash text-primary"></i>
            )}{" "}
            {/* Toggle button text */}
          </span>
        </div>
        <div className="flex justify-end p-0">
          <h1 className="text-sm text-secondary underline">Forget Password?</h1>
        </div>
        <input
          type="submit"
          value="Login"
          className="bg-secondary text-primary px-3 py-2 font-semibold"
        />
      </form>

      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  );
}

export default Login;
