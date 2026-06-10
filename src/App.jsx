import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MusicPlayer from './components/common/MusicPlayer';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Program from './pages/Program';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';
import BeritaDetail from './pages/BeritaDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            <Route path="/berita/:id" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <BeritaDetail />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            <Route path="/profil" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Profil />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            <Route path="/program" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Program />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            <Route path="/galeri" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Galeri />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            <Route path="/kontak" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Kontak />
                </main>
                <Footer />
                <MusicPlayer />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
