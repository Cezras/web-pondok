import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, MessageCircle, Video, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pesantren-darkGreen text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Tentang */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo Al-Hikmah" className="w-10 h-10 object-contain bg-white rounded-full p-0.5" />
              <span className="text-pesantren-yellow">Al-Hikmah</span>
            </h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              Membangun generasi Qur'ani yang berakhlak mulia, cerdas, dan mandiri berlandaskan ajaran Ahlussunnah wal Jama'ah.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-pesantren-yellow hover:text-gray-900 transition-colors">
                <Globe size={20} />
              </a>
              <a href="https://www.instagram.com/alhikmah.pemenang.official_/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-pesantren-yellow hover:text-gray-900 transition-colors" title="Instagram Resmi">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-pesantren-yellow hover:text-gray-900 transition-colors">
                <Video size={20} />
              </a>
            </div>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-pesantren-yellow pb-2 inline-block">
              Link Cepat
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/profil" className="text-gray-200 hover:text-pesantren-yellow transition-colors flex items-center gap-2">
                  <span className="text-xs">▶</span> Sejarah & Profil
                </NavLink>
              </li>
              <li>
                <NavLink to="/program" className="text-gray-200 hover:text-pesantren-yellow transition-colors flex items-center gap-2">
                  <span className="text-xs">▶</span> Program Pendidikan
                </NavLink>
              </li>
              <li>
                <NavLink to="/galeri" className="text-gray-200 hover:text-pesantren-yellow transition-colors flex items-center gap-2">
                  <span className="text-xs">▶</span> Galeri Kegiatan
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontak" className="text-gray-200 hover:text-pesantren-yellow transition-colors flex items-center gap-2">
                  <span className="text-xs">▶</span> Pendaftaran Santri Baru
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Kontak Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-pesantren-yellow pb-2 inline-block">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-pesantren-yellow shrink-0 mt-1" size={20} />
                <span className="text-gray-200">
                  Karang Desa, Pemenang Barat, Kec. Pemenang, Kab. Lombok Utara, Nusa Tenggara Barat
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-pesantren-yellow shrink-0" size={20} />
                <span className="text-gray-200">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-pesantren-yellow shrink-0" size={20} />
                <span className="text-gray-200">info@alhikmah.edu</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Yayasan Pondok Modern Al-Hikmah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
