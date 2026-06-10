import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const BeritaDetail = () => {
  const { id } = useParams();

  // Dummy data berita
  const beritaData = {
    'wisuda-kmi': {
      title: 'Wisuda Santri KMI Angkatan ke-7 — Ferventera Generation Pondok Modern Al-Hikmah Pemenang',
      date: '10 Mei 2026',
      author: 'Admin',
      category: 'Kegiatan Pesantren',
      image: '/wisuda.png',
      fallbackImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
      content: (
        <>
          <p className="mb-4">
            Alhamdulillāh, dengan penuh rasa syukur dan haru, kami mengabadikan momen bersejarah Wisuda Santri Kelas Akhir KMI Angkatan ke-7 Ferventera Generation Pondok Modern Al-Hikmah Pemenang.
          </p>
          <p className="mb-4">
            Perjalanan panjang yang ditempuh dengan kesungguhan, disiplin, dan pengorbanan kini berbuah manis. Bukan sekadar akhir dari masa belajar, namun awal dari pengabdian yang sesungguhnya di tengah umat. Semoga ilmu yang telah diraih menjadi cahaya penerang dalam setiap langkah, serta menjadi bekal untuk terus berkontribusi bagi agama, bangsa, dan masyarakat.
          </p>
          <p className="mb-4">
            Teriring doa, semoga para wisudawan senantiasa istiqamah dalam menjaga nilai-nilai keislaman, berakhlak mulia, serta mampu menjadi generasi yang tangguh, berilmu, dan berintegritas.
          </p>
          <blockquote className="border-l-4 border-pesantren-green pl-4 italic text-gray-700 my-6 font-medium text-xl">
            “Lulus bukan berarti selesai, tetapi siap untuk mengabdi dan memberi arti.”
          </blockquote>
          <p className="mb-4">
            Selamat dan sukses untuk Ferventera Generation. Teruslah melangkah, ukir masa depan dengan iman, ilmu, dan amal.
          </p>
          <div className="mt-8 flex gap-2 flex-wrap">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#WisudaSantri</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#KMI</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#FerventeraGeneration</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#AlHikmahPemenang</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#GenerasiBerilmu</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#SantriMengabdi</span>
          </div>
        </>
      )
    },
    'yudisium-kmi': {
      title: 'Yudisium dan Pengarahan Pengabdian Santri Kelas Akhir KMI Angkatan ke-7',
      date: '09 Mei 2026',
      author: 'Admin',
      category: 'Kegiatan Pesantren',
      image: '/yudisium.png',
      fallbackImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
      content: (
        <>
          <p className="mb-4">
            Dengan penuh rasa syukur, telah terlaksana kegiatan Yudisium dan Pengarahan Pengabdian Santri Kelas Akhir KMI Angkatan ke-7 Pondok Modern Al-Hikmah Pemenang.
          </p>
          <p className="mb-4">
            Kegiatan ini menjadi penanda berakhirnya masa pendidikan formal para santri, sekaligus awal dari pengabdian nyata di tengah masyarakat. Seluruh proses yang telah dilalui selama menempuh pendidikan di pondok diharapkan menjadi bekal berharga dalam menjalankan amanah pengabdian dengan penuh tanggung jawab, keikhlasan, dan dedikasi.
          </p>
          <p className="mb-4">
            Kami mengucapkan selamat kepada seluruh santri kelas akhir KMI Angkatan ke-7. Semoga ilmu yang diperoleh dapat diamalkan dengan sebaik-baiknya serta menjadi kontribusi nyata bagi agama, bangsa, dan masyarakat.
          </p>
          <blockquote className="border-l-4 border-pesantren-green pl-4 italic text-gray-700 my-6 font-medium text-xl">
            "Semoga setiap langkah pengabdian senantiasa mendapat ridha Allah SWT."
          </blockquote>
          <div className="mt-8 flex gap-2 flex-wrap">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#YudisiumSantri</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#KMI</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#Pengabdian</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#AlHikmahPemenang</span>
          </div>
        </>
      )
    },
    'halal-bihalal': {
      title: 'Dokumentasi Halal Bihalal Pondok Modern Al-Hikmah Pemenang',
      date: '19 April 2026',
      author: 'Admin',
      category: 'Acara & Silaturahmi',
      image: '/bihalal.png',
      fallbackImage: 'https://images.unsplash.com/photo-1601058268574-0610360a0b27?auto=format&fit=crop&q=80&w=1200',
      content: (
        <>
          <p className="mb-4">
            Alhamdulillahirabbil ‘alamin, segala puji bagi Allah yang telah mempertemukan kita kembali dalam momen penuh makna, Halal Bihalal keluarga besar Pondok Modern Al-Hikmah Pemenang.
          </p>
          <p className="mb-4">
            Acara ini bukan sekadar tradisi tahunan, melainkan ruang untuk menautkan kembali hati yang mungkin sempat berjarak, menguatkan ukhuwah yang telah lama terjalin, serta memperbarui niat dalam kebersamaan di jalan kebaikan. Di setiap senyuman, jabat tangan, dan pelukan hangat, tersimpan keikhlasan untuk saling memaafkan dan melangkah dengan hati yang lebih lapang.
          </p>
          <p className="mb-4">
            Para asatidz, alumni, santri, serta seluruh keluarga besar pondok hadir dalam satu tujuan: menjaga silaturahmi dan merawat nilai-nilai yang telah ditanamkan oleh para pendiri. Momen ini menjadi pengingat bahwa pondok bukan hanya tempat menimba ilmu, tetapi juga rumah yang selalu menyatukan, dalam suka maupun duka.
          </p>
          <blockquote className="border-l-4 border-pesantren-green pl-4 italic text-gray-700 my-6 font-medium text-xl">
            "Semoga dari pertemuan ini lahir keberkahan yang terus mengalir, mempererat persaudaraan, serta menguatkan langkah kita dalam menebar kebaikan di mana pun berada."
          </blockquote>
          <div className="mt-8 flex gap-2 flex-wrap">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#HalalBihalal</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#KeluargaBesar</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#Ukhuwah</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#AlHikmahPemenang</span>
          </div>
        </>
      )
    },
    'donasi-ramadhan': {
      title: 'Penyaluran Donasi Program Ramadhan Berbagi Bersama Yayasan Pondok Modern Al-Hikmah Pemenang',
      date: 'Ramadhan 1447 H / 2026',
      author: 'Admin',
      category: 'Sosial & Kemanusiaan',
      image: '/donasi.png',
      fallbackImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1200',
      content: (
        <>
          <p className="mb-4">
            Alhamdulillah, program Ramadhan Berbagi bersama Yayasan Pondok Modern Al-Hikmah Pemenang telah terlaksana dengan baik.
          </p>
          <p className="mb-4">
            Berkat kepercayaan dan kebaikan hati para donatur, donasi yang terkumpul dalam program ini mencapai <strong>Rp 14.649.000</strong>. Dana tersebut telah kami salurkan dalam bentuk 100 paket sembako untuk para lansia dan dhuafa di Kecamatan Pemenang, Kabupaten Lombok Utara.
          </p>
          <p className="mb-4">
            Semoga bantuan ini dapat sedikit meringankan kebutuhan mereka, terlebih di bulan suci Ramadhan yang penuh berkah.
          </p>
          <p className="mb-4">
            Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh donatur dan pihak yang telah berpartisipasi dalam program Ramadhan Berbagi ini. Semoga setiap kebaikan yang diberikan menjadi amal jariyah dan dibalas dengan pahala yang berlipat ganda oleh Allah SWT.
          </p>
          <blockquote className="border-l-4 border-pesantren-green pl-4 italic text-gray-700 my-6 font-medium text-xl">
            "Semoga semangat berbagi dan kepedulian ini terus tumbuh, sehingga semakin banyak saudara-saudara kita yang dapat merasakan manfaatnya. 🤲✨"
          </blockquote>
          <div className="mt-8 flex gap-2 flex-wrap">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#RamadhanBerbagi</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#DonasiSosial</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#PeduliDhuafa</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#AlHikmahPemenang</span>
          </div>
        </>
      )
    }
  };

  const berita = beritaData[id];

  if (!berita) {
    return (
      <div className="pt-32 min-h-screen text-center bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Berita tidak ditemukan</h1>
        <p className="text-gray-500 mb-8">Halaman berita yang Anda cari mungkin sedang dalam tahap pengembangan.</p>
        <Link to="/" className="bg-pesantren-green text-white px-6 py-2 rounded-lg hover:bg-pesantren-darkGreen transition-colors">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pesantren-green transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
        </Link>

        {/* Header Berita */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
            <span className="flex items-center gap-1 bg-pesantren-green/10 text-pesantren-darkGreen px-3 py-1 rounded-full font-medium">
              <Tag size={14} /> {berita.category}
            </span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {berita.date}</span>
            <span className="flex items-center gap-1"><User size={14} /> {berita.author}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {berita.title}
          </h1>
        </div>

        {/* Gambar Utama */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <img 
            src={berita.image} 
            alt={berita.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = berita.fallbackImage;
            }}
          />
        </div>

        {/* Konten Berita */}
        <article className="prose prose-lg max-w-none text-gray-800 text-lg leading-relaxed">
          {berita.content}
        </article>

      </div>
    </div>
  );
};

export default BeritaDetail;
