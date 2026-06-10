import React from 'react';
import { Book, Users, Star, PenTool, Lightbulb } from 'lucide-react';

const Program = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Pendidikan & Pembinaan</h1>
          <div className="w-24 h-1 bg-pesantren-green mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan program pendidikan formal dan nonformal yang terstruktur untuk membentuk kepribadian, kemampuan akademis, serta keterampilan berorganisasi santri.
          </p>
        </div>

        {/* Program Unggulan */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-pesantren-green">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Users className="text-pesantren-green" size={28} /> Keorganisasian & Kepemimpinan
            </h3>
            <p className="text-gray-600 mb-4">
              Pembinaan jiwa kepemimpinan melalui kegiatan <strong>OSMA, PBR, dan PBS</strong>. Santri dilatih menyusun, melaksanakan, dan mengevaluasi program kerja secara sistematis untuk membentuk kesiapan memimpin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-pesantren-yellow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Lightbulb className="text-pesantren-yellow" size={28} /> Pengembangan Bahasa
            </h3>
            <p className="text-gray-600 mb-4">
              Peningkatan kemampuan bahasa asing melalui <strong>Language Orientation</strong> dan <strong>Syahru al-Lughah</strong> yang diadakan khusus setiap bulan Ramadhan di Aula Modern.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-pesantren-red">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Book className="text-pesantren-red" size={28} /> Latihan Mengajar (Amaliyah Tadris)
            </h3>
            <p className="text-gray-600 mb-4">
              Santri tingkat akhir diwajibkan mengikuti latihan mengajar kursus sore. Program ini melatih mereka membuat persiapan mengajar, memenej kelas, dan membekali keterampilan sebagai pendidik.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <PenTool className="text-blue-500" size={28} /> Literasi & Karya Ilmiah
            </h3>
            <p className="text-gray-600 mb-4">
              Program menulis karya ilmiah khusus. Membiasakan santri berpikir ilmiah, mengekspresikan pikiran sistematis, dan mengutip pendapat secara kritis dari berbagai pemikiran tokoh ulama dan ilmuwan.
            </p>
          </div>
        </div>

        {/* Bimbingan Khusus */}
        <div className="bg-pesantren-darkGreen text-white rounded-2xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          <Star className="absolute top-0 right-0 text-white/10 w-64 h-64 -mt-16 -mr-16" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Program Bimbingan "Pasowanan"</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto relative z-10">
            Kegiatan konseling khusus untuk santri guna membantu mereka mencapai perkembangan optimal, menggali potensi diri, dan melatih kemandirian dalam menghadapi tantangan baru di masa depan.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Program;
