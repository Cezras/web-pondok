import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';

const Home = () => {
  const { beritaList } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-pesantren-darkGreen text-white py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        {/* Placeholder for background image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=1920" 
            alt="Pesantren Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Membangun Generasi <br className="hidden md:block" />
            <span className="text-pesantren-yellow">Qur'ani & Berakhlak Mulia</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 mx-auto mb-10">
            Berdiri sejak tahun 1996, Pondok Modern Al-Hikmah berdedikasi mencetak generasi unggul yang berkarakter Islam, mandiri, dan berilmu pengetahuan luas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" className="text-lg px-8 py-3">
              Daftar Sekarang
            </Button>
            <Button variant="outline" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-pesantren-darkGreen">
              Pelajari Program
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Visi Misi Singkat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi & Misi Kami</h2>
            <div className="w-24 h-1 bg-pesantren-red mx-auto rounded"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-pesantren-green/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="text-pesantren-green" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                "Menjadi lembaga pendidikan Islam terdepan yang mengintegrasikan pemahaman turats (kitab kuning), tahfidz Al-Qur'an, dan wawasan global untuk melahirkan pemimpin masa depan."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-pesantren-yellow/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <ArrowRight className="text-pesantren-red mt-1 shrink-0" size={20} />
                  <span>Menyelenggarakan pendidikan Islam berbasis kitab kuning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="text-pesantren-red mt-1 shrink-0" size={20} />
                  <span>Membina hafalan dan pemahaman Al-Qur'an secara komprehensif.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="text-pesantren-red mt-1 shrink-0" size={20} />
                  <span>Membekali santri dengan life skill dan bahasa asing.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-16 bg-pesantren-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-green-500/50">
            <div className="p-6">
              <Users className="mx-auto mb-4 text-pesantren-yellow" size={48} />
              <div className="text-5xl font-extrabold mb-2">1,250+</div>
              <div className="text-green-100 text-xl">Santri Aktif</div>
            </div>
            <div className="p-6">
              <BookOpen className="mx-auto mb-4 text-pesantren-yellow" size={48} />
              <div className="text-5xl font-extrabold mb-2">85</div>
              <div className="text-green-100 text-xl">Ustadz/Asatidz</div>
            </div>
            <div className="p-6">
              <Building className="mx-auto mb-4 text-pesantren-yellow" size={48} />
              <div className="text-5xl font-extrabold mb-2">24</div>
              <div className="text-green-100 text-xl">Gedung Fasilitas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru - Dynamic from Context */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita & Artikel</h2>
              <div className="w-24 h-1 bg-pesantren-green rounded"></div>
            </div>
            <Link to="/galeri">
              <Button variant="outline" className="hidden sm:inline-flex">
                Lihat Semua
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {beritaList.slice(0, 4).map((berita) => (
              <div key={berita.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    src={berita.image || '/wisuda.png'} 
                    alt={berita.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="text-sm text-pesantren-red font-semibold mb-2">{berita.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-pesantren-green cursor-pointer transition-colors leading-snug">
                    {berita.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 grow">
                    {berita.excerpt}
                  </p>
                  <Link to={`/berita/${berita.id}`} className="inline-flex items-center text-pesantren-green font-medium hover:text-pesantren-darkGreen mt-auto">
                    Baca selengkapnya <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/galeri">
              <Button variant="outline" className="w-full">
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
