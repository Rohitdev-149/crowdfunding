import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CreateProject from "./components/CreateProject/CreateProject";
import Payment from "./components/Payment/Payment";
import Categories from "./components/Categories/Categories";
import About from "./components/About/About";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SignIn from "./components/Auth/SignIn";
import WhyInvestSection from "./components/common/WhyInvestSection";
import JoinCommunitySection from "./components/common/JoinCommunitySection";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/create-project"
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/category/:category" element={<Categories />} />
          </Routes>
        </main>
        <WhyInvestSection />
        <JoinCommunitySection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
