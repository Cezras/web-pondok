import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Music, Upload, Save, X, LogOut, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const { currentMusic, updateMusic, refreshData } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('musik');
  const [musicName, setMusicName] = useState('');
  const musicFileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [token, setToken] = useState(null);
  
  // State untuk berita dari database
  const [beritaList, setBeritaList] = useState([]);
  const [loadingBerita, setLoadingBerita] = useState(true);
  
  // State untuk galeri dari database
  const [galeriList, setGaleriList] = useState([]);
  const [loadingGaleri, setLoadingGaleri] = useState(true);

  // Form state untuk berita
  const [beritaForm, setBeritaForm] = useState({
    title: '',
    content: '',
    published: true
  });
  const [beritaImage, setBeritaImage] = useState(null);

  // Form state untuk galeri
  const [galeriForm, setGaleriForm] = useState({
    title: '',
    caption: ''
  });
  const [galeriImage, setGaleriImage] = useState(null);

  // Load token dan data saat mount
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      fetchBerita();
      fetchGaleri();
      if (currentMusic) {
        setMusicName(currentMusic.name);
      }
    } else {
      navigate('/admin/login');
    }
  }, []);

  const fetchBerita = async () => {
    try {
      setLoadingBerita(true);
      const res = await axios.get(`${API_URL}/news/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBeritaList(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching berita:', error);
    } finally {
      setLoadingBerita(false);
    }
  };

  const fetchGaleri = async () => {
    try {
      setLoadingGaleri(true);
      const res = await axios.get(`${API_URL}/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setGaleriList(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching galeri:', error);
    } finally {
      setLoadingGaleri(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleMusicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('musicFile', file);
    formData.append('name', musicName || file.name);

    try {
      const res = await axios.post(`${API_URL}/music`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        updateMusic({
          name: res.data.data.name,
          url: `${API_URL}${res.data.data.fileUrl}`
        });
        alert('Musik berhasil diupload!');
        refreshData();
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload musik: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
      if (musicFileRef.current) {
        musicFileRef.current.value = '';
      }
    }
  };

  const handleSaveMusic = () => {
    updateMusic({
      name: musicName,
      url: currentMusic?.url
    });
    alert('Nama musik berhasil disimpan!');
  };

  const handleAddBerita = async (e) => {
    e.preventDefault();
    if (!beritaForm.title || !beritaForm.content) {
      alert('Judul dan konten harus diisi!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', beritaForm.title);
    formData.append('content', beritaForm.content);
    formData.append('published', beritaForm.published);
    if (beritaImage) {
      formData.append('image', beritaImage);
    }

    try {
      const res = await axios.post(`${API_URL}/news`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setBeritaForm({ title: '', content: '', published: true });
        setBeritaImage(null);
        await fetchBerita();
        await refreshData();
        alert('Berita berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Create news error:', error);
      alert('Gagal menambah berita: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBerita = async (id) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      try {
        await axios.delete(`${API_URL}/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchBerita();
        await refreshData();
        alert('Berita berhasil dihapus!');
      } catch (error) {
        console.error('Delete news error:', error);
        alert('Gagal menghapus berita');
      }
    }
  };

  const handleAddGaleri = async (e) => {
    e.preventDefault();
    if (!galeriForm.title || !galeriImage) {
      alert('Judul dan gambar harus diisi!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', galeriForm.title);
    formData.append('caption', galeriForm.caption || '');
    formData.append('image', galeriImage);

    try {
      const res = await axios.post(`${API_URL}/gallery`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        setGaleriForm({ title: '', caption: '' });
        setGaleriImage(null);
        await fetchGaleri();
        await refreshData();
        alert('Foto berhasil ditambahkan!');
      }
    } catch (error) {
      console.error('Upload gallery error:', error);
      alert('Gagal menambah foto: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGaleri = async (id) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      try {
        await axios.delete(`${API_URL}/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchGaleri();
        await refreshData();
        alert('Foto berhasil dihapus!');
      } catch (error) {
        console.error('Delete gallery error:', error);
        alert('Gagal menghapus foto');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pesantren-green rounded-lg flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Pondok Modern Al-Hikmah</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6 border-b overflow-x-auto">
          {[
            { id: 'musik', label: 'Musik Pondok' },
            { id: 'berita', label: 'Kelola Berita' },
            { id: 'galeri', label: 'Kelola Galeri' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-pesantren-green text-pesantren-green'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content: Musik */}
        {activeTab === 'musik' && (
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Music size={24} className="text-pesantren-green" />
              Pengaturan Musik Pondok
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Musik
                </label>
                <input
                  type="text"
                  value={musicName}
                  onChange={(e) => setMusicName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green focus:border-transparent outline-none"
                  placeholder="Masukkan nama musik"
                />
                <button
                  onClick={handleSaveMusic}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-pesantren-green text-white rounded-lg hover:bg-pesantren-darkGreen transition-colors"
                >
                  <Save size={18} />
                  Simpan Nama
                </button>
              </div>

              <div className="pt-6 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File Musik
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Upload file MP3 musik pondok</p>
                  <input
                    ref={musicFileRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleMusicUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => musicFileRef.current?.click()}
                    className="px-4 py-2 bg-pesantren-green text-white rounded-lg hover:bg-pesantren-darkGreen transition-colors"
                  >
                    Pilih File
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Musik saat ini: <strong>{currentMusic.name}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Berita */}
        {activeTab === 'berita' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Tambah Berita */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tambah Berita Baru</h2>
              <form onSubmit={handleAddBerita} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Berita</label>
                  <input
                    type="text"
                    value={beritaForm.title}
                    onChange={(e) => setBeritaForm({...beritaForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gambar (Opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBeritaImage(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konten Lengkap</label>
                  <textarea
                    value={beritaForm.content}
                    onChange={(e) => setBeritaForm({...beritaForm, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    rows="8"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={beritaForm.published}
                    onChange={(e) => setBeritaForm({...beritaForm, published: e.target.checked})}
                    className="w-4 h-4 text-pesantren-green focus:ring-pesantren-green"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">Publikasikan Sekarang</label>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-pesantren-green text-white py-2 rounded-lg font-semibold hover:bg-pesantren-darkGreen transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading && <Loader size={18} className="animate-spin" />}
                  {uploading ? 'Mengupload...' : 'Tambah Berita'}
                </button>
              </form>
            </div>

            {/* Daftar Berita */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Daftar Berita ({beritaList.length})</h2>
              {loadingBerita ? (
                <div className="flex justify-center items-center py-12">
                  <Loader size={32} className="animate-spin text-pesantren-green" />
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {beritaList.map(berita => (
                    <div key={berita._id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                      {berita.imageUrl && (
                        <img src={`${API_URL}${berita.imageUrl}`} alt={berita.title} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{berita.title}</h3>
                        <p className="text-sm text-gray-500">{new Date(berita.createdAt).toLocaleDateString('id-ID')}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{berita.content.substring(0, 100)}...</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBerita(berita._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg self-start"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Galeri */}
        {activeTab === 'galeri' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Tambah Galeri */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tambah Foto Galeri</h2>
              <form onSubmit={handleAddGaleri} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Foto</label>
                  <input
                    type="text"
                    value={galeriForm.title}
                    onChange={(e) => setGaleriForm({...galeriForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption (Opsional)</label>
                  <textarea
                    value={galeriForm.caption}
                    onChange={(e) => setGaleriForm({...galeriForm, caption: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    rows="2"
                    placeholder="Deskripsi foto..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGaleriImage(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-pesantren-green text-white py-2 rounded-lg font-semibold hover:bg-pesantren-darkGreen transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading && <Loader size={18} className="animate-spin" />}
                  {uploading ? 'Mengupload...' : 'Tambah Foto'}
                </button>
              </form>
            </div>

            {/* Daftar Galeri */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Daftar Galeri ({galeriList.length})</h2>
              {loadingGaleri ? (
                <div className="flex justify-center items-center py-12">
                  <Loader size={32} className="animate-spin text-pesantren-green" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                  {galeriList.map(foto => (
                    <div key={foto._id} className="relative group">
                      <img src={`${API_URL}${foto.imageUrl}`} alt={foto.title} className="w-full h-32 object-cover rounded-lg bg-gray-100" />
                      <p className="text-sm font-medium text-gray-700 mt-1 truncate">{foto.title}</p>
                      {foto.caption && <p className="text-xs text-gray-500 truncate">{foto.caption}</p>}
                      <p className="text-xs text-gray-500">{new Date(foto.createdAt).toLocaleDateString('id-ID')}</p>
                      <button
                        onClick={() => handleDeleteGaleri(foto._id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
