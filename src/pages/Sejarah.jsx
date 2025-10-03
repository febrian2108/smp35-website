import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

const Sejarah = () => {
  const { documents: profilData, loading } = useFirestore('profil_sekolah');
  const [sejarah, setSejarah] = useState('');

  useEffect(() => {
    if (profilData.length > 0) {
      setSejarah(profilData[0].sejarah || '');
    }
  }, [profilData]);

  // Default content if no data from Firestore
  const defaultSejarah = `SMP Negeri 35 Bandar Lampung merupakan salah satu sekolah menengah pertama negeri yang berdiri di Kota Bandar Lampung berdasarkan SK Pendirian Nomor 620/III.01/HK/2017 tertanggal 14 November 2017. Pendirian sekolah ini menjadi bagian dari upaya pemerintah dalam memenuhi kebutuhan pendidikan jenjang SMP di kawasan Teluk Betung Utara, khususnya Kelurahan Kupang Kota. Dengan lokasi di Jl. Drs. Warsito No. 48, sekolah ini hadir sebagai institusi pendidikan formal baru yang diharapkan dapat menampung jumlah siswa yang semakin meningkat seiring pertumbuhan penduduk di daerah tersebut.

Sejak berdiri, SMP Negeri 35 Bandar Lampung langsung menjalankan kegiatan belajar mengajar dengan dukungan fasilitas dasar seperti ruang kelas, perpustakaan, serta sarana sanitasi dan listrik yang memadai. Pada tahun 2018, sekolah ini memperoleh akreditasi B berdasarkan SK Akreditasi 132/BAN-SM/LPG/XI/2018, yang menandakan pengakuan resmi terhadap kualitas penyelenggaraan pendidikan yang diberikan. Seiring perkembangannya, sekolah ini terus melengkapi sarana pendidikan dan meningkatkan kualitas tenaga pengajar, sehingga mampu menjadi salah satu pilihan sekolah menengah pertama negeri di Bandar Lampung yang berkomitmen mencetak lulusan berdaya saing dan berkarakter.`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat sejarah sekolah...</p>
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
              Sejarah Sekolah
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <img
              src="/assets/photo-sejarah-smp-negeri-35-bdl.jpg"
              alt="SMP Negeri 35 Bandar Lampung"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-6 text-justify">
                  {( defaultSejarah).split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Sejarah;