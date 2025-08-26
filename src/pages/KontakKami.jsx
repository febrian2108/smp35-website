import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Users, BookOpen, UserPlus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirestore } from '../hooks/useFirestore';

const KontakKami = () => {
  const { documents: kontakData, loading } = useFirestore('kontak');
  const [kontak, setKontak] = useState(null);

  useEffect(() => {
    if (kontakData.length > 0) {
      setKontak(kontakData[0]);
    }
  }, [kontakData]);

  // Default contact data if no data from Firestore
  const defaultKontak = {
    alamat: "Jl. Drs. Warsito No.48, Kupang Kota, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35211",
    telepon: " 0821-8182-8118",
    email: "smpn35bandarlampung@gmail.com",
  };

  const kontakInfo = defaultKontak;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat informasi kontak...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontak Kami
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang kegiatan akademik,
              penerimaan peserta didik baru, dan layanan sekolah lainnya
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-2xl space-y-8">
              {/* Judul */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Kami siap membantu Anda dengan berbagai informasi dan layanan yang dibutuhkan.
                  Jangan ragu untuk menghubungi kami melalui berbagai cara berikut.
                </p>
              </div>

              {/* Kontak Items */}
              <div className="space-y-6">
                {/* Address */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="max-w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                      {kontakInfo.alamat}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="max-w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telepon</h3>
                    <a
                      href={`tel:${kontakInfo.telepon}`}
                      className="text-gray-600 hover:text-green-600 transition-colors text-sm sm:text-base break-all"
                    >
                      {kontakInfo.telepon}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="max-w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${kontakInfo.email}`}
                      className="text-gray-600 hover:text-purple-600 transition-colors text-sm sm:text-base break-words"
                    >
                      {kontakInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="w-full sm:w-auto px-6 py-2"
                    onClick={() => window.open(`tel:${kontakInfo.telepon}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Telepon Sekarang
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-6 py-2"
                    onClick={() => window.open(`mailto:${kontakInfo.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Kirim Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <MessageCircle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Masih Ada Pertanyaan?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Tim kami siap membantu menjawab semua pertanyaan Anda.
              Jangan ragu untuk menghubungi kami kapan saja!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900"
                onClick={() => window.open(`tel:${kontakInfo.telepon}`)}
              >
                <Phone className="h-5 w-5 mr-2" />
                Hubungi Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-900 hover:bg-blue-200"
                onClick={() => window.open(`mailto:${kontakInfo.email}`)}
              >
                <Mail className="h-5 w-5 mr-2" />
                Kirim Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontakKami;

