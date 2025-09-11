import Footer from '../components/Footer';
import { useState } from 'react';
import { Users, Clock, MapPin, Star, Heart, Palette, Trophy, BookOpen, HeartPlus, User, Menu } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

const Ekstrakurikuler = () => {
  const { documents: ekstrakurikulerData, loading } = useFirestore('ekstrakurikuler');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Default data if no data from Firestore
  const defaultData = [
    {
      id: '1',
      nama: 'Pramuka',
      deskripsi: 'Kegiatan kepramukaan yang mengembangkan karakter, kepemimpinan, dan keterampilan hidup. Dilaksanakan setiap hari Jumat sore dengan berbagai kegiatan menarik seperti berkemah, hiking, dan bakti sosial.',
      fotoUrl: '',
      kategori: 'Karakter',
      jadwal: 'Jumat, 14:00-16:00',
      pembina: 'Bapak Agus Priyanto, S.Pd',
      tempat: 'Lapangan Sekolah'
    },
    {
      id: '2',
      nama: 'Paduan Suara',
      deskripsi: 'Ekstrakurikuler musik vokal yang melatih kemampuan bernyanyi secara berkelompok. Sering tampil dalam acara sekolah dan kompetisi tingkat kota.',
      fotoUrl: '',
      kategori: 'Seni',
      jadwal: 'Selasa & Kamis, 15:00-17:00',
      pembina: 'Ibu Maya Sari, S.Pd',
      tempat: 'Ruang Musik'
    },
    {
      id: '3',
      nama: 'Basket',
      deskripsi: 'Tim basket sekolah yang aktif mengikuti kompetisi antar sekolah. Melatih kerjasama tim, sportivitas, dan kebugaran jasmani.',
      fotoUrl: '',
      kategori: 'Olahraga',
      jadwal: 'Senin, Rabu, Jumat 15:30-17:30',
      pembina: 'Bapak Hendra Kusuma, S.Pd',
      tempat: 'Lapangan Basket'
    },
    {
      id: '4',
      nama: 'English Club',
      deskripsi: 'Klub bahasa Inggris yang fokus pada pengembangan kemampuan speaking, listening, reading, dan writing. Sering mengadakan English Day dan drama bahasa Inggris.',
      fotoUrl: '',
      kategori: 'Akademik',
      jadwal: 'Rabu, 14:00-15:30',
      pembina: 'Ibu Rina Marlina, S.Pd',
      tempat: 'Ruang Kelas 9A'
    },
    {
      id: '5',
      nama: 'Seni Tari',
      deskripsi: 'Ekstrakurikuler tari tradisional dan modern yang melestarikan budaya daerah sekaligus mengembangkan kreativitas siswa dalam seni gerak.',
      fotoUrl: '',
      kategori: 'Seni',
      jadwal: 'Selasa & Kamis, 14:30-16:30',
      pembina: 'Ibu Dewi Lestari, S.Sn',
      tempat: 'Aula Sekolah'
    },
    {
      id: '6',
      nama: 'Robotika',
      deskripsi: 'Klub robotika yang mengajarkan dasar-dasar programming dan engineering. Siswa belajar membuat robot sederhana dan mengikuti kompetisi robotika.',
      fotoUrl: '',
      kategori: 'Teknologi',
      jadwal: 'Sabtu, 08:00-11:00',
      pembina: 'Bapak Budi Santoso, S.Pd',
      tempat: 'Lab Komputer'
    },
    {
      id: '7',
      nama: 'PMR (Palang Merah Remaja)',
      deskripsi: 'Organisasi kemanusiaan yang mengajarkan pertolongan pertama, kesehatan, dan kepedulian sosial. Aktif dalam kegiatan donor darah dan bakti sosial.',
      fotoUrl: '',
      kategori: 'Sosial',
      jadwal: 'Jumat, 13:00-15:00',
      pembina: 'Ibu Sari Indrawati, S.Pd',
      tempat: 'Ruang UKS'
    },
    {
      id: '8',
      nama: 'Jurnalistik',
      deskripsi: 'Ekstrakurikuler yang mengembangkan kemampuan menulis, fotografi, dan jurnalistik. Mengelola majalah sekolah dan website berita siswa.',
      fotoUrl: '',
      kategori: 'Media',
      jadwal: 'Kamis, 14:00-16:00',
      pembina: 'Bapak Ahmad Wijaya, M.Pd',
      tempat: 'Ruang Perpustakaan'
    }
  ];

  const dataToShow = ekstrakurikulerData.length > 0 ? ekstrakurikulerData : defaultData;

  const categories = [
    { id: 'all', name: 'Semua', icon: <Menu className="h-4 w-4" /> },
    { id: 'Akademik', name: 'Akademik', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'Seni', name: 'Seni', icon: <Palette className="h-4 w-4" /> },
    { id: 'Olahraga', name: 'Olahraga', icon: <Trophy className="h-4 w-4" /> },
    { id: 'Organisasi', name: 'Organisasi', icon: <Users className="h-4 w-4" /> },
    { id: 'Keagamaan', name: 'Keagamaan', icon: <User className="h-4 w-4" /> },
    { id: 'Karakter', name: 'Karakter', icon: <Star className="h-4 w-4" /> },
    { id: 'Kesehatan', name: 'Kesehatan', icon: <HeartPlus  className="h-4 w-4" /> }
  ];

  const filteredData = selectedCategory === 'all'
    ? dataToShow
    : dataToShow.filter(item => item.kategori === selectedCategory);

  const getCategoryColor = (kategori) => {
    switch (kategori) {
      case 'Akademik': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Seni': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Olahraga': return 'bg-green-100 text-green-800 border-green-200';
      case 'Organisasi': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Keagamaan': return 'bg-red-100 text-red-800 border-red-200';
      case 'Karakter': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Kesehatan': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (kategori) => {
    switch (kategori) {
      case 'Akademik': return <BookOpen className="h-5 w-5" />;
      case 'Seni': return <Palette className="h-5 w-5" />;
      case 'Olahraga': return <Trophy className="h-5 w-5" />;
      case 'Organisasi': return <Users className="h-5 w-5" />;
      case 'Keagamaan': return <User className="h-5 w-5" />;
      case 'Karakter': return <Star className="h-5 w-5" />;
      case 'Kesehatan': return <HeartPlus className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data ekstrakurikuler...</p>
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
              Ekstrakurikuler
            </h1>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak Ada Ekstrakurikuler
              </h3>
              <p className="text-gray-600">
                Tidak ada ekstrakurikuler yang sesuai dengan kategori yang dipilih.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((ekskul) => (
                <div
                  key={ekskul.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                    {ekskul.fotoUrl ? (
                      <img
                        src={ekskul.fotoUrl}
                        alt={ekskul.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-white">
                          {getCategoryIcon(ekskul.kategori)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(ekskul.kategori)}`}>
                        {getCategoryIcon(ekskul.kategori)}
                        <span>{ekskul.kategori}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {ekskul.nama}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {ekskul.deskripsi}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      {ekskul.jadwal && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>{ekskul.jadwal}</span>
                        </div>
                      )}

                      {ekskul.tempat && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span>{ekskul.tempat}</span>
                        </div>
                      )}

                      {ekskul.pembina && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>{ekskul.pembina}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Manfaat Mengikuti Ekstrakurikuler
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Star className="h-8 w-8 text-yellow-500" />,
                  title: "Mengembangkan Bakat",
                  description: "Menemukan dan mengasah potensi diri di bidang yang diminati"
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-500" />,
                  title: "Membangun Relasi",
                  description: "Bertemu teman baru dan membangun jaringan pertemanan yang luas"
                },
                {
                  icon: <Trophy className="h-8 w-8 text-green-500" />,
                  title: "Meraih Prestasi",
                  description: "Berkompetisi dan meraih prestasi di tingkat kota, provinsi, hingga nasional"
                },
                {
                  icon: <Heart className="h-8 w-8 text-red-500" />,
                  title: "Membentuk Karakter",
                  description: "Mengembangkan kepemimpinan, tanggung jawab, dan nilai-nilai positif"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gray-50 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Ekstrakurikuler;

