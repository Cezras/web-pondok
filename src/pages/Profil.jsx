import React from 'react';
import { Clock, Shield, Target, Heart, Users } from 'lucide-react';

const Profil = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profil & Sejarah</h1>
          <div className="w-24 h-1 bg-pesantren-green mx-auto rounded"></div>
        </div>

        {/* Sejarah Singkat */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sejarah Berdirinya</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                <strong>Pondok Modern al-Hikmah</strong> didirikan pada tahun <strong>1996</strong> untuk memenuhi kebutuhan pendidikan agama di masyarakat. 
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Seiring berjalannya waktu, pondok ini berkembang pesat dan kini menyediakan pendidikan formal serta nonformal. Tujuan utama kami adalah membentuk generasi unggul yang berkarakter Islam, mandiri, dan memiliki jiwa kepemimpinan.
              </p>
            </div>
            <div className="md:w-1/2">
              {/* Image Placeholder */}
              <div className="bg-gray-200 rounded-xl h-64 md:h-80 w-full overflow-hidden flex items-center justify-center relative">
                <img src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=1024" alt="Gedung Pesantren" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Panca Jiwa Pondok */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nilai-Nilai (Panca Jiwa)</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
              <Heart className="mx-auto text-pesantren-red mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Keikhlasan</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
              <Shield className="mx-auto text-pesantren-green mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Kesederhanaan</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
              <Target className="mx-auto text-pesantren-yellow mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Berdikari</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
              <Users className="mx-auto text-blue-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Ukhuwah Islamiyah</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
              <Clock className="mx-auto text-purple-500 mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Kebebasan</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profil;
