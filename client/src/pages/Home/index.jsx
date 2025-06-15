import Contact from "../../components/Contact";
import Navbar from "../../components/Navbar";
import Intro from "../../components/Intro";
import Project from "../../components/Project";
import About from "../../components/About";
import Footer from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import { useSelector } from "react-redux";
import Experiences from "../../components/Experiences";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  return (
    <div>
      {portfolioData && (
        <div>
          <Navbar />
          <div className="bg-primary px-40 sm:px-5">
            <Intro introData={portfolioData.intro} /> 
            <About aboutData={portfolioData.about} />
            <Experiences experienceData={portfolioData.experiences} />
            <Project projectData={portfolioData.projects} />
            <Contact contactData={portfolioData.contact} />
            <Footer />
            <SocialMedia links={portfolioData.link} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
