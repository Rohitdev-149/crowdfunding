import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import CreateProject from "./components/CreateProject/CreateProject.jsx";
import Payment from "./components/Payment/Payment.jsx";
import Categories from "./components/Categories/Categories.jsx";
import About from "./components/About/About.jsx";
import WhyInvestSection from "./components/common/WhyInvestSection.jsx";
import JoinCommunitySection from "./components/common/JoinCommunitySection.jsx";

import ProjectDetails from "./components/projectDetails/ProjectDetails.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Nav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/category/:category" element={<Categories />} />

              <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
          </main>
          <WhyInvestSection />
          <JoinCommunitySection />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
