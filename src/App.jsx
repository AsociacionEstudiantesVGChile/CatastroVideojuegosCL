import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About";
import Join from "./pages/Join/Join";
import Search from "./pages/Search/Search";
import Volunteer from "./pages/Volunteer/Volunteer";
import Contact from "./pages/Contact/Contact";
import TeamPage from "./pages/Team/TeamPage.jsx";
import GamePage from "./pages/Game/GamePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/join" element={<Join />} />
      <Route path="/search" element={<Search />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/team/:id" element={<TeamPage />} />
      <Route path="/game/:id" element={<GamePage />} />
    </Routes>
  );
}

export default App;
