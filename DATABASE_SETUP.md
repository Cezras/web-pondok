# 🗄️ Database Integration - MongoDB Atlas

## ✅ Fitur yang Ditambahkan

### Backend (Express + MongoDB)
- **Server Express.js** dengan struktur modular
- **MongoDB Mongoose** untuk database modeling
- **JWT Authentication** untuk keamanan admin
- **Multer** untuk upload file (musik, berita, galeri)
- **CORS** untuk komunikasi frontend-backend

### Models
1. **Admin** - Manajemen user admin
2. **Music** - Penyimpanan data musik pondok
3. **News** - Berita kegiatan pondok
4. **Gallery** - Foto galeri kegiatan

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register admin baru
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get data admin yang login

#### Music
- `GET /api/music` - Ambil semua musik
- `GET /api/music/latest` - Ambil musik terbaru (untuk player)
- `POST /api/music` - Upload musik baru (Admin only)
- `DELETE /api/music/:id` - Hapus musik (Admin only)

#### News
- `GET /api/news` - Ambil semua berita published (Public)
- `GET /api/news/all` - Ambil semua berita termasuk draft (Admin only)
- `GET /api/news/:id` - Ambil detail berita
- `POST /api/news` - Buat berita baru (Admin only)
- `PUT /api/news/:id` - Update berita (Admin only)
- `DELETE /api/news/:id` - Hapus berita (Admin only)

#### Gallery
- `GET /api/gallery` - Ambil semua foto galeri (Public)
- `POST /api/gallery` - Upload foto baru (Admin only)
- `DELETE /api/gallery/:id` - Hapus foto (Admin only)

## 🚀 Setup & Instalasi

### 1. Setup MongoDB Atlas

1. Kunjungi [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat akun gratis (Free Tier tersedia)
3. Buat cluster baru
4. Dapatkan connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/pondok-pesantren?retryWrites=true&w=majority
   ```

### 2. Konfigurasi Environment

Edit file `/server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pondok-pesantren?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Edit file `/.env` (frontend):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Install dependencies server
cd server
npm install

# Kembali ke root dan install concurrently
cd ..
npm install concurrently axios
```

### 4. Jalankan Aplikasi

**Mode Development (Frontend + Backend):**
```bash
npm run dev
```

Ini akan menjalankan:
- Frontend di `http://localhost:5173`
- Backend API di `http://localhost:5000`

**Hanya Backend:**
```bash
cd server
npm run dev
```

**Hanya Frontend:**
```bash
npm run dev:client
```

## 🔐 Default Admin Credentials

Setelah setup pertama kali, gunakan credentials ini untuk login:
- **Username:** `admin`
- **Password:** `pondok123`

> ⚠️ **PENTING:** Ganti password default setelah login pertama kali!

## 📁 Struktur Folder Server

```
server/
├── config/
│   └── db.js              # Koneksi database
├── models/
│   ├── Admin.js           # Model admin
│   ├── Music.js           # Model musik
│   ├── News.js            # Model berita
│   └── Gallery.js         # Model galeri
├── routes/
│   ├── auth.js            # Routes authentication
│   ├── music.js           # Routes musik
│   ├── news.js            # Routes berita
│   └── gallery.js         # Routes galeri
├── uploads/
│   ├── music/             # File musik yang diupload
│   ├── news/              # Gambar berita
│   └── gallery/           # Foto galeri
├── middleware/            # Middleware (auth, dll)
├── .env                   # Environment variables
├── .env.example           # Template environment
├── package.json
└── index.js               # Entry point server
```

## 🎯 Cara Menggunakan

### 1. Upload Musik Pondok
1. Login ke dashboard admin (`/admin/login`)
2. Pilih tab "Musik Pondok"
3. Masukkan nama musik
4. Upload file MP3
5. Musik akan otomatis diputar di website

### 2. Posting Berita
1. Pilih tab "Kelola Berita"
2. Isi judul dan konten berita
3. Upload gambar (opsional)
4. Centang "Publikasikan Sekarang"
5. Klik "Tambah Berita"

### 3. Upload Foto Galeri
1. Pilih tab "Kelola Galeri"
2. Isi judul foto
3. Tambahkan caption (opsional)
4. Upload file gambar
5. Klik "Tambah Foto"

## 🔒 Keamanan

- Password di-hash menggunakan bcrypt
- JWT token untuk autentikasi API
- File upload dibatasi (max 50MB untuk musik, 10MB untuk gambar)
- Validasi tipe file (hanya audio/image yang diterima)
- CORS configured untuk domain tertentu

## 🌐 Deployment

### Production Checklist

1. **Environment Variables:**
   - Ganti `JWT_SECRET` dengan random string yang kuat
   - Set `NODE_ENV=production`
   - Gunakan MongoDB Atlas production cluster

2. **Build Frontend:**
   ```bash
   npm run build
   ```

3. **Deploy Server:**
   - Gunakan layanan seperti Railway, Render, atau Heroku
   - Atau deploy ke VPS sendiri dengan PM2

4. **Update API URL:**
   - Set `VITE_API_URL` ke URL production server Anda

## 🛠️ Troubleshooting

### Error: MongoDB Connection Failed
- Pastikan connection string benar
- Cek IP whitelist di MongoDB Atlas
- Pastikan network access sudah dikonfigurasi

### Error: Upload Gagal
- Cek folder `uploads/` memiliki permission write
- Pastikan ukuran file tidak melebihi limit
- Verifikasi tipe file sesuai yang diperbolehkan

### Error: CORS Issue
- Pastikan backend CORS configured dengan benar
- Untuk development, pastikan port frontend/backend sesuai

## 📞 Support

Untuk pertanyaan atau issue, silakan hubungi tim developer.

---

**Dibuat dengan ❤️ untuk Pondok Modern Al-Hikmah**
