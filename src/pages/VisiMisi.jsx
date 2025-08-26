import { useState, useEffect } from 'react';
import { Target, Eye, CheckCircle, Star } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

const VisiMisi = () => {
  const { documents: profilData, loading } = useFirestore('profil_sekolah');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState([]);
  const [tujuan, setTujuan] = useState([]);

  useEffect(() => {
    if (profilData.length > 0) {
      const data = profilData[0];
      setVisi(data.visi || '');
      setMisi(data.misi || []);
      setTujuan(data.tujuan || []);
    }
  }, [profilData]);

  // Default content if no data from Firestore
  const defaultVisi = "Meningkatkan prestasi siswa berdasarkan iman dan takwa.";
  
  const defaultMisi = [
    "agar peserta didik menjadi siswa yang berprestasi ",
    "menjadi anak yang berguna bagi nusa dan bangsa",
  ];

  const defaultTujuan = [
    "Meningkatkan prestasi akademik siswa yang dapat bersaing di tingkat regional dan nasional",
    "Menghasilkan lulusan yang memiliki karakter kuat dan berakhlak mulia",
    "Mengembangkan bakat dan minat siswa melalui berbagai kegiatan ekstrakurikuler",
    "Menciptakan budaya sekolah yang religius dan peduli lingkungan",
    "Meningkatkan profesionalisme guru dan tenaga kependidikan",
    "Mewujudkan manajemen sekolah yang transparan dan akuntabel"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat visi misi sekolah...</p>
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
              Visi, Misi & Tujuan
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Komitmen SMP Negeri 35 Bandar Lampung dalam memberikan pendidikan berkualitas
            </p>
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visi Sekolah
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 md:p-12 border border-blue-100">
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed italic">
                "{defaultVisi}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Misi Sekolah
              </h2>
              <p className="text-lg text-gray-600">
                Langkah-langkah strategis untuk mewujudkan visi sekolah
              </p>
            </div>

            <div className="grid gap-6">
              {(defaultMisi).map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                <Star className="h-8 w-8 text-blue-900" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nilai-Nilai Sekolah
              </h2>
              <p className="text-xl text-blue-200">
                Prinsip-prinsip yang menjadi landasan dalam setiap kegiatan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Religius", desc: "Mengutamakan nilai-nilai agama dalam kehidupan sehari-hari" },
                { title: "Integritas", desc: "Jujur, konsisten, dan dapat dipercaya dalam setiap tindakan" },
                { title: "Inovatif", desc: "Selalu mencari cara baru untuk meningkatkan kualitas pendidikan" },
                { title: "Peduli", desc: "Memiliki kepedulian terhadap sesama dan lingkungan sekitar" }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisiMisi;

