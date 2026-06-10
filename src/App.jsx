import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Program from './pages/Program';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';
import BeritaDetail from './pages/BeritaDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/berita/:id" element={<BeritaDetail />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/program" element={<Program />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
