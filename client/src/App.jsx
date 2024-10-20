import { useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  ReloadData,
} from "./redux/rootSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/Loader";
import Login from "./pages/Admin/Login";
import ProjectDetail from "./components/ProjectDetail";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading()); // Show loader while fetching data
      const response = await axios.get(
        "http://localhost:5000/api/portfolio/get-portfolio-data"
      );

      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      dispatch(HideLoading()); // Hide loader after fetching data
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);
  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/project-details/:id" element={<ProjectDetail />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
