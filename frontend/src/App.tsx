import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import { GlobalStyle } from "./GlobalStyle";
import Articles from "./pages/Articles";
import Projects from "./pages/Projects";
import AboutUs from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Crawlai from "./pages/CrawlAi";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/crawlai" element={<Crawlai />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
