import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Music, Upload, Save, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentMusic, updateMusic, beritaList, addBerita, deleteBerita, galeriList, addGaleri, deleteGaleri } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('musik');
  const [musicName, setMusicName] = useState(currentMusic.name);
  const musicFileRef = useRef(null);
  
  // Form state untuk berita
  const [beritaForm, setBeritaForm] = useState({
    title: '',
    category: 'Kegiatan Pesantren',
    image: '',
    excerpt: '',
    content: ''
  });

  // Form state untuk galeri
  const [galeriForm, setGaleriForm] = useState({
    title: '',
    image: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateMusic({
        name: musicName || file.name,
        url: url
      });
      alert('Musik berhasil diupdate!');
    }
  };

  const handleSaveMusic = () => {
    updateMusic({
      name: musicName,
      url: currentMusic.url
    });
    alert('Nama musik berhasil disimpan!');
  };

  const handleAddBerita = (e) => {
    e.preventDefault();
    if (!beritaForm.title || !beritaForm.excerpt) {
      alert('Judul dan ringkasan harus diisi!');
      return;
    }
    addBerita(beritaForm);
    setBeritaForm({
      title: '',
      category: 'Kegiatan Pesantren',
      image: '',
      excerpt: '',
      content: ''
    });
    alert('Berita berhasil ditambahkan!');
  };

  const handleDeleteBerita = (id) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      deleteBerita(id);
      alert('Berita berhasil dihapus!');
    }
  };

  const handleAddGaleri = (e) => {
    e.preventDefault();
    if (!galeriForm.title || !galeriForm.image) {
      alert('Judul dan URL gambar harus diisi!');
      return;
    }
    addGaleri(galeriForm);
    setGaleriForm({
      title: '',
      image: ''
    });
    alert('Foto berhasil ditambahkan!');
  };

  const handleDeleteGaleri = (id) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      deleteGaleri(id);
      alert('Foto berhasil dihapus!');
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={beritaForm.category}
                    onChange={(e) => setBeritaForm({...beritaForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                  >
                    <option>Kegiatan Pesantren</option>
                    <option>Acara & Silaturahmi</option>
                    <option>Sosial & Kemanusiaan</option>
                    <option>Prestasi Santri</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                  <input
                    type="text"
                    value={beritaForm.image}
                    onChange={(e) => setBeritaForm({...beritaForm, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    placeholder="/wisuda.png atau https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ringkasan</label>
                  <textarea
                    value={beritaForm.excerpt}
                    onChange={(e) => setBeritaForm({...beritaForm, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konten Lengkap</label>
                  <textarea
                    value={beritaForm.content}
                    onChange={(e) => setBeritaForm({...beritaForm, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    rows="5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pesantren-green text-white py-2 rounded-lg font-semibold hover:bg-pesantren-darkGreen transition-colors"
                >
                  Tambah Berita
                </button>
              </form>
            </div>

            {/* Daftar Berita */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Daftar Berita ({beritaList.length})</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {beritaList.map(berita => (
                  <div key={berita.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                    {berita.image && (
                      <img src={berita.image} alt={berita.title} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{berita.title}</h3>
                      <p className="text-sm text-gray-500">{berita.date} • {berita.category}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{berita.excerpt}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteBerita(berita.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg self-start"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                  <input
                    type="text"
                    value={galeriForm.image}
                    onChange={(e) => setGaleriForm({...galeriForm, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pesantren-green outline-none"
                    placeholder="/wisuda.png atau https://..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pesantren-green text-white py-2 rounded-lg font-semibold hover:bg-pesantren-darkGreen transition-colors"
                >
                  Tambah Foto
                </button>
              </form>
            </div>

            {/* Daftar Galeri */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Daftar Galeri ({galeriList.length})</h2>
              <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                {galeriList.map(foto => (
                  <div key={foto.id} className="relative group">
                    <img src={foto.image} alt={foto.title} className="w-full h-32 object-cover rounded-lg bg-gray-100" />
                    <p className="text-sm font-medium text-gray-700 mt-1 truncate">{foto.title}</p>
                    <p className="text-xs text-gray-500">{foto.date}</p>
                    <button
                      onClick={() => handleDeleteGaleri(foto.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
