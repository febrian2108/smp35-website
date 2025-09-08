import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
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

  const defaultKontak = {
    alamat:
      'Jl. Drs. Warsito No.48, Kupang Kota, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35211',
    telepon: '0821-8182-8118',
    email: 'smpn35bandarlampung@gmail.com',
  };

  const kontakInfo =  defaultKontak;

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak Kami</h1>
          </div>
        </div>
      </section>

      {/* Contact Info + Google Maps side by side */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Kami siap membantu Anda dengan berbagai informasi dan layanan
                  yang dibutuhkan. Jangan ragu untuk menghubungi kami melalui
                  berbagai cara berikut.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Alamat
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                      {kontakInfo.alamat}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Telepon
                    </h3>
                    <a
                      href={`tel:${kontakInfo.telepon}`}
                      className="text-gray-600 hover:text-green-600 transition-colors text-sm sm:text-base break-all"
                    >
                      {kontakInfo.telepon}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
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
                <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Google Maps */}
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.853752634158!2d105.2608612!3d-5.439168899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40db02b1dccbeb%3A0xa66a1f38ff22b4b5!2sSMP%20Negeri%2035%20bandar%20lampung!5e0!3m2!1sen!2sid!4v1757310846873!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default KontakKami;
