import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // State untuk musik
  const [currentMusic, setCurrentMusic] = useState(() => {
    const saved = localStorage.getItem('pondokMusic');
    return saved ? JSON.parse(saved) : { name: 'Default Music', url: '/music/default.mp3' };
  });

  // State untuk berita
  const [beritaList, setBeritaList] = useState(() => {
    const saved = localStorage.getItem('pondokBerita');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Wisuda Santri KMI Angkatan ke-7 — Ferventera Generation',
        category: 'Kegiatan Pesantren',
        image: '/wisuda.png',
        excerpt: 'Alhamdulillah, dengan penuh rasa syukur dan haru, kami mengabadikan momen bersejarah Wisuda Santri Kelas Akhir KMI Angkatan ke-7 Ferventera Generation Pondok Modern Al-Hikmah Pemenang.',
        content: 'Konten lengkap berita wisuda...',
        date: '2024-01-15',
        author: 'Admin Pondok'
      },
      {
        id: '2',
        title: 'Yudisium dan Pengarahan Pengabdian Santri KMI Angkatan ke-7',
        category: 'Kegiatan Pesantren',
        image: '/yudisium.png',
        excerpt: 'Kegiatan ini menjadi penanda berakhirnya masa pendidikan formal para santri, sekaligus awal dari pengabdian nyata di tengah masyarakat.',
        content: 'Konten lengkap berita yudisium...',
        date: '2024-01-10',
        author: 'Admin Pondok'
      },
      {
        id: '3',
        title: 'Halal Bihalal Keluarga Besar Pondok Modern Al-Hikmah',
        category: 'Acara & Silaturahmi',
        image: '/bihalal.png',
        excerpt: 'Momen penuh makna untuk menautkan kembali hati, menguatkan ukhuwah, serta memperbarui niat dalam kebersamaan di jalan kebaikan.',
        content: 'Konten lengkap berita halal bihalal...',
        date: '2024-01-05',
        author: 'Admin Pondok'
      },
      {
        id: '4',
        title: 'Penyaluran Donasi Program Ramadhan Berbagi',
        category: 'Sosial & Kemanusiaan',
        image: '/donasi.png',
        excerpt: 'Alhamdulillah, donasi yang terkumpul dalam program ini mencapai Rp 14.649.000 dan telah disalurkan untuk lansia dan dhuafa.',
        content: 'Konten lengkap berita donasi...',
        date: '2024-01-01',
        author: 'Admin Pondok'
      }
    ];
  });

  // State untuk galeri foto
  const [galeriList, setGaleriList] = useState(() => {
    const saved = localStorage.getItem('pondokGaleri');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Wisuda 2024', image: '/wisuda.png', date: '2024-01-15' },
      { id: '2', title: 'Yudisium 2024', image: '/yudisium.png', date: '2024-01-10' },
      { id: '3', title: 'Halal Bihalal', image: '/bihalal.png', date: '2024-01-05' },
      { id: '4', title: 'Donasi Ramadhan', image: '/donasi.png', date: '2024-01-01' }
    ];
  });

  // Simpan ke localStorage saat data berubah
  useEffect(() => {
    localStorage.setItem('pondokMusic', JSON.stringify(currentMusic));
  }, [currentMusic]);

  useEffect(() => {
    localStorage.setItem('pondokBerita', JSON.stringify(beritaList));
  }, [beritaList]);

  useEffect(() => {
    localStorage.setItem('pondokGaleri', JSON.stringify(galeriList));
  }, [galeriList]);

  // Fungsi untuk update musik
  const updateMusic = (musicData) => {
    setCurrentMusic(musicData);
  };

  // Fungsi untuk tambah berita
  const addBerita = (beritaData) => {
    const newBerita = {
      ...beritaData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      author: 'Admin Pondok'
    };
    setBeritaList(prev => [newBerita, ...prev]);
  };

  // Fungsi untuk update berita
  const updateBerita = (id, beritaData) => {
    setBeritaList(prev => prev.map(item => item.id === id ? { ...item, ...beritaData } : item));
  };

  // Fungsi untuk hapus berita
  const deleteBerita = (id) => {
    setBeritaList(prev => prev.filter(item => item.id !== id));
  };

  // Fungsi untuk tambah foto galeri
  const addGaleri = (galeriData) => {
    const newGaleri = {
      ...galeriData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setGaleriList(prev => [newGaleri, ...prev]);
  };

  // Fungsi untuk hapus foto galeri
  const deleteGaleri = (id) => {
    setGaleriList(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    currentMusic,
    updateMusic,
    beritaList,
    addBerita,
    updateBerita,
    deleteBerita,
    galeriList,
    addGaleri,
    deleteGaleri
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
