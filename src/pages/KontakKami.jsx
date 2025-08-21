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
    alamat: "Jl. Soekarno-Hatta No. 123, Bandar Lampung, Lampung 35142",
    telepon: "0721-123456",
    email: "smpn35_bdl@yahoo.co.id",
    mapsUrl: "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3972.1234567890!2d105.2345678!3d-5.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSMP%20Negeri%2035%20Bandar%20Lampung!5e0!3m2!1sen!2sid!4v1234567890"
  };

  const kontakInfo = kontak || defaultKontak;

  const layananInfo = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Kegiatan Akademik",
      description: "Informasi tentang kurikulum, jadwal pelajaran, dan program akademik",
      items: [
        "Konsultasi akademik",
        "Informasi kurikulum",
        "Jadwal ujian dan evaluasi",
        "Program remedial dan pengayaan"
      ]
    },
    {
      icon: <UserPlus className="h-8 w-8 text-green-600" />,
      title: "Penerimaan Peserta Didik Baru",
      description: "Informasi lengkap tentang pendaftaran siswa baru",
      items: [
        "Syarat dan ketentuan pendaftaran",
        "Jadwal pendaftaran",
        "Biaya pendidikan",
        "Proses seleksi"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Layanan Sekolah Lainnya",
      description: "Berbagai layanan pendukung untuk siswa dan orang tua",
      items: [
        "Konseling dan bimbingan",
        "Layanan kesehatan (UKS)",
        "Perpustakaan sekolah",
        "Kantin dan koperasi sekolah"
      ]
    }
  ];

  const jamOperasional = [
    { hari: "Senin - Jumat", jam: "07:00 - 15:00 WIB" },
    { hari: "Sabtu", jam: "07:00 - 12:00 WIB" },
    { hari: "Minggu", jam: "Tutup" }
  ];

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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Informasi Kontak
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Kami siap membantu Anda dengan berbagai informasi dan layanan yang dibutuhkan. 
                  Jangan ragu untuk menghubungi kami melalui berbagai cara berikut.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {kontakInfo.alamat}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telepon</h3>
                    <a 
                      href={`tel:${kontakInfo.telepon}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {kontakInfo.telepon}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a 
                      href={`mailto:${kontakInfo.email}`}
                      className="text-gray-600 hover:text-purple-600 transition-colors"
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
                    className="flex-1"
                    onClick={() => window.open(`tel:${kontakInfo.telepon}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Telepon Sekarang
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(`mailto:${kontakInfo.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Kirim Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={kontakInfo.mapsUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi SMP Negeri 35 Bandar Lampung"
                  className="w-full"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => window.open(kontakInfo.mapsUrl, '_blank')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka di Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan yang dapat kami berikan untuk mendukung pendidikan dan perkembangan siswa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {layananInfo.map((layanan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    {layanan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {layanan.title}
                  </h3>
                  <p className="text-gray-600">
                    {layanan.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {layanan.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-lg text-gray-600">
                Beberapa pertanyaan umum yang sering ditanyakan tentang sekolah kami
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Kapan waktu pendaftaran siswa baru?",
                  answer: "Pendaftaran siswa baru biasanya dibuka pada bulan Mei-Juni setiap tahunnya. Informasi lengkap akan diumumkan melalui website dan media sosial sekolah."
                },
                {
                  question: "Apa saja ekstrakurikuler yang tersedia?",
                  answer: "Kami menyediakan berbagai ekstrakurikuler seperti Pramuka, Paduan Suara, Basket, English Club, Seni Tari, Robotika, PMR, dan Jurnalistik."
                },
                {
                  question: "Bagaimana sistem pembelajaran di sekolah?",
                  answer: "Kami menerapkan kurikulum nasional dengan pendekatan pembelajaran yang inovatif, mengintegrasikan teknologi, dan mengembangkan karakter siswa."
                },
                {
                  question: "Apakah tersedia layanan konseling?",
                  answer: "Ya, kami memiliki guru BK yang siap membantu siswa dalam berbagai masalah akademik maupun personal."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
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
                className="border-white text-white hover:bg-white hover:text-blue-900"
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

