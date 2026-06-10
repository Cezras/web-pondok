import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

// API Base URL - sesuaikan dengan environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // State untuk musik
  const [currentMusic, setCurrentMusic] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk berita
  const [beritaList, setBeritaList] = useState([]);
  
  // State untuk galeri foto
  const [galeriList, setGaleriList] = useState([]);

  // Fetch data dari database saat pertama kali load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch music terbaru
        const musicRes = await axios.get(`${API_URL}/music/latest`);
        if (musicRes.data.success && musicRes.data.data) {
          setCurrentMusic({
            name: musicRes.data.data.name,
            url: `${API_URL}${musicRes.data.data.fileUrl}`
          });
        } else {
          // Fallback ke default jika tidak ada musik
          setCurrentMusic({ name: 'Default Music', url: '/music/default.mp3' });
        }

        // Fetch berita
        const newsRes = await axios.get(`${API_URL}/news`);
        if (newsRes.data.success) {
          setBeritaList(newsRes.data.data.map(item => ({
            id: item._id,
            title: item.title,
            category: 'Kegiatan Pesantren',
            image: item.imageUrl ? `${API_URL}${item.imageUrl}` : '/default-news.png',
            excerpt: item.content.substring(0, 150) + '...',
            content: item.content,
            date: new Date(item.createdAt).toISOString().split('T')[0],
            author: 'Admin Pondok'
          })));
        }

        // Fetch galeri
        const galleryRes = await axios.get(`${API_URL}/gallery`);
        if (galleryRes.data.success) {
          setGaleriList(galleryRes.data.data.map(item => ({
            id: item._id,
            title: item.title,
            image: `${API_URL}${item.imageUrl}`,
            caption: item.caption,
            date: new Date(item.createdAt).toISOString().split('T')[0]
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback ke localStorage jika API gagal
        loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi fallback ke localStorage
  const loadFromLocalStorage = () => {
    const savedMusic = localStorage.getItem('pondokMusic');
    if (savedMusic) {
      setCurrentMusic(JSON.parse(savedMusic));
    } else {
      setCurrentMusic({ name: 'Default Music', url: '/music/default.mp3' });
    }

    const savedBerita = localStorage.getItem('pondokBerita');
    if (savedBerita) {
      setBeritaList(JSON.parse(savedBerita));
    }

    const savedGaleri = localStorage.getItem('pondokGaleri');
    if (savedGaleri) {
      setGaleriList(JSON.parse(savedGaleri));
    }
  };

  // Simpan ke localStorage saat data berubah (backup)
  useEffect(() => {
    if (currentMusic) {
      localStorage.setItem('pondokMusic', JSON.stringify(currentMusic));
    }
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

  // Fungsi untuk refresh data dari server
  const refreshData = async () => {
    setLoading(true);
    try {
      const musicRes = await axios.get(`${API_URL}/music/latest`);
      if (musicRes.data.success && musicRes.data.data) {
        setCurrentMusic({
          name: musicRes.data.data.name,
          url: `${API_URL}${musicRes.data.data.fileUrl}`
        });
      }

      const newsRes = await axios.get(`${API_URL}/news`);
      if (newsRes.data.success) {
        setBeritaList(newsRes.data.data.map(item => ({
          id: item._id,
          title: item.title,
          category: 'Kegiatan Pesantren',
          image: item.imageUrl ? `${API_URL}${item.imageUrl}` : '/default-news.png',
          excerpt: item.content.substring(0, 150) + '...',
          content: item.content,
          date: new Date(item.createdAt).toISOString().split('T')[0],
          author: 'Admin Pondok'
        })));
      }

      const galleryRes = await axios.get(`${API_URL}/gallery`);
      if (galleryRes.data.success) {
        setGaleriList(galleryRes.data.data.map(item => ({
          id: item._id,
          title: item.title,
          image: `${API_URL}${item.imageUrl}`,
          caption: item.caption,
          date: new Date(item.createdAt).toISOString().split('T')[0]
        })));
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentMusic,
    updateMusic,
    beritaList,
    setBeritaList,
    galeriList,
    setGaleriList,
    loading,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
