import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CreateProject from "./components/CreateProject/CreateProject";
import Payment from "./components/Payment/Payment";
import "./App.css";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="App">
          <Nav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/payment" element={<Payment />} />
              {/* Add other routes here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;
