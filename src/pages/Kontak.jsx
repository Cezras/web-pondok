import React from 'react';
import Button from '../components/common/Button';
import { MapPin, Phone, Mail } from 'lucide-react';

const Kontak = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran santri baru, program pendidikan, atau pertanyaan lainnya.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pesantren-green focus:border-pesantren-green" placeholder="Masukkan nama Anda" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pesantren-green focus:border-pesantren-green" placeholder="alamat@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pesantren-green focus:border-pesantren-green" placeholder="Tuliskan pesan Anda di sini..."></textarea>
              </div>
              <Button type="button" className="w-full">Kirim Pesan</Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-6 text-gray-600">
                <div className="flex items-start gap-4">
                  <MapPin className="text-pesantren-green shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p>Karang Desa, Pemenang Barat, Kec. Pemenang, Kab. Lombok Utara, NTB</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-pesantren-green shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
                    <p>+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-pesantren-green shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p>info@alhikmah.edu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maps & Petunjuk Arah */}
            <div className="relative h-72 rounded-2xl border border-gray-200 overflow-hidden shadow-sm group">
              <iframe 
                src="https://maps.google.com/maps?q=Pondok+Pesantren+Al-Hikmah&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Pesantren"
              ></iframe>
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <a 
                  href="https://maps.app.goo.gl/F1cNJLRXzjoaboHs7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pesantren-green text-white px-6 py-3 rounded-lg font-medium hover:bg-pesantren-darkGreen transition-colors flex items-center gap-2 shadow-lg pointer-events-auto"
                >
                  <MapPin size={20} /> Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
