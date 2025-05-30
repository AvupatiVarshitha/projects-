import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Entrepreneurship from './pages/Entrepreneurship';
import Meditation from './pages/Meditation';
import SoftSkills from './pages/SoftSkills';
import Feedback from './pages/feedback';
import AboutUs from './pages/AboutUs';
import JoinUs from './pages/JoinUs';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrepreneurship" element={<Entrepreneurship />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/soft-skills" element={<SoftSkills />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        
      </Routes>
    </>
  );
}

export default App;
