import React from 'react';
import { motion } from 'framer-motion';

const Galeri = () => {
  const photos = [
    {
      id: 1,
      src: '/wisuda.png',
      fallback: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      title: 'Wisuda Santri KMI Angkatan ke-7',
      category: 'Kegiatan'
    },
    {
      id: 2,
      src: '/yudisium.png',
      fallback: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      title: 'Yudisium Santri KMI Angkatan ke-7',
      category: 'Kegiatan'
    },
    {
      id: 3,
      src: '/bihalal.png',
      fallback: 'https://images.unsplash.com/photo-1601058268574-0610360a0b27?auto=format&fit=crop&q=80&w=800',
      title: 'Halal Bihalal Keluarga Besar',
      category: 'Acara'
    },
    {
      id: 4,
      src: '/donasi.png',
      fallback: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800',
      title: 'Program Ramadhan Berbagi',
      category: 'Sosial'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      fallback: '',
      title: 'Kegiatan Ekstrakurikuler',
      category: 'Kegiatan'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80&w=800',
      fallback: '',
      title: 'Peringatan Hari Besar Islam',
      category: 'Acara'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri Kegiatan</h1>
          <div className="w-24 h-1 bg-pesantren-green mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Dokumentasi berbagai aktivitas, fasilitas, dan momen-momen berharga di Pondok Modern Al-Hikmah Pemenang.
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {photos.map((photo) => (
            <motion.div variants={item} key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
              <div className="h-64 overflow-hidden bg-gray-200">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  onError={(e) => {
                    if(photo.fallback && e.target.src !== photo.fallback) {
                      e.target.onerror = null;
                      e.target.src = photo.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-pesantren-yellow font-medium text-sm mb-1">{photo.category}</span>
                <h3 className="text-white font-bold text-xl">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Galeri;
