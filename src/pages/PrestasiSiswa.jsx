import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Calendar, Award, Users } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

const PrestasiSiswa = () => {
  const { documents: prestasiData, loading } = useFirestore('prestasi');
  const [filteredPrestasi, setFilteredPrestasi] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    if (prestasiData.length > 0) {
      if (selectedYear === 'all') {
        setFilteredPrestasi(prestasiData);
      } else {
        setFilteredPrestasi(prestasiData.filter(item => item.tahun === parseInt(selectedYear)));
      }
    }
  }, [prestasiData, selectedYear]);

  // Default data if no data from Firestore
  const defaultData = [
    {
      id: '1',
      tahun: 2024,
      nama: 'Olimpiade Sains Nasional (OSN) Matematika',
      deskripsi: 'Juara 1 Tingkat Provinsi Lampung - Ahmad Rizki Pratama',
      tingkat: 'Provinsi',
      kategori: 'Akademik'
    },
    {
      id: '2',
      tahun: 2024,
      nama: 'Lomba Karya Tulis Ilmiah',
      deskripsi: 'Juara 2 Tingkat Kota Bandar Lampung - Siti Nurhaliza',
      tingkat: 'Kota',
      kategori: 'Akademik'
    },
    {
      id: '3',
      tahun: 2024,
      nama: 'Festival Seni Siswa Nasional (FLS2N) Tari Tradisional',
      deskripsi: 'Juara 3 Tingkat Nasional - Tim Tari SMP Negeri 35',
      tingkat: 'Nasional',
      kategori: 'Seni'
    },
    {
      id: '4',
      tahun: 2023,
      nama: 'Olimpiade Sains Nasional (OSN) IPA',
      deskripsi: 'Juara 2 Tingkat Provinsi Lampung - Budi Santoso',
      tingkat: 'Provinsi',
      kategori: 'Akademik'
    },
    {
      id: '5',
      tahun: 2023,
      nama: 'Lomba Pidato Bahasa Indonesia',
      deskripsi: 'Juara 1 Tingkat Kota Bandar Lampung - Rina Marlina',
      tingkat: 'Kota',
      kategori: 'Bahasa'
    },
    {
      id: '6',
      tahun: 2023,
      nama: 'Kompetisi Robotika Tingkat SMP',
      deskripsi: 'Juara 2 Tingkat Provinsi - Tim Robotika SMP Negeri 35',
      tingkat: 'Provinsi',
      kategori: 'Teknologi'
    },
    {
      id: '7',
      tahun: 2022,
      nama: 'Lomba Cerdas Cermat IPS',
      deskripsi: 'Juara 1 Tingkat Kota Bandar Lampung - Tim IPS',
      tingkat: 'Kota',
      kategori: 'Akademik'
    },
    {
      id: '8',
      tahun: 2022,
      nama: 'Festival Musik Tradisional',
      deskripsi: 'Juara 3 Tingkat Provinsi - Ensemble Musik Tradisional',
      tingkat: 'Provinsi',
      kategori: 'Seni'
    }
  ];

  const dataToShow = filteredPrestasi.length > 0 ? filteredPrestasi : defaultData.filter(item => 
    selectedYear === 'all' || item.tahun === parseInt(selectedYear)
  );

  const getAvailableYears = () => {
    const data = prestasiData.length > 0 ? prestasiData : defaultData;
    const years = [...new Set(data.map(item => item.tahun))].sort((a, b) => b - a);
    return years;
  };

  const getTingkatColor = (tingkat) => {
    switch (tingkat?.toLowerCase()) {
      case 'nasional': return 'bg-red-100 text-red-800 border-red-200';
      case 'provinsi': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'kota': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getKategoriIcon = (kategori) => {
    switch (kategori?.toLowerCase()) {
      case 'akademik': return <Award className="h-5 w-5" />;
      case 'seni': return <Star className="h-5 w-5" />;
      case 'olahraga': return <Trophy className="h-5 w-5" />;
      case 'teknologi': return <Medal className="h-5 w-5" />;
      default: return <Trophy className="h-5 w-5" />;
    }
  };

  const getJuaraIcon = (deskripsi) => {
    if (deskripsi.toLowerCase().includes('juara 1')) {
      return <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>;
    } else if (deskripsi.toLowerCase().includes('juara 2')) {
      return <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>;
    } else if (deskripsi.toLowerCase().includes('juara 3')) {
      return <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>;
    }
    return <Trophy className="h-6 w-6 text-yellow-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data prestasi...</p>
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
              Prestasi Siswa
            </h1>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">15+</div>
              <div className="text-gray-700 font-medium">Prestasi Nasional</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">30+</div>
              <div className="text-gray-700 font-medium">Prestasi Provinsi</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-700 font-medium">Prestasi Kota</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">100+</div>
              <div className="text-gray-700 font-medium">Total Prestasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter berdasarkan tahun:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua Tahun
              </button>
              {getAvailableYears().map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year.toString())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedYear === year.toString() 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {dataToShow.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Trophy className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum Ada Prestasi
              </h3>
              <p className="text-gray-600">
                Prestasi siswa akan ditampilkan di sini ketika tersedia.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {dataToShow.map((prestasi) => (
                <div 
                  key={prestasi.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        {/* Achievement Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getJuaraIcon(prestasi.deskripsi)}
                        </div>
                        
                        <div className="flex-1">
                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {prestasi.nama}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            {prestasi.deskripsi}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {/* Year */}
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                              <Calendar className="h-3 w-3" />
                              <span>{prestasi.tahun}</span>
                            </span>
                            
                            {/* Level */}
                            <span className={`px-3 py-1 text-sm rounded-full border ${getTingkatColor(prestasi.tingkat)}`}>
                              {prestasi.tingkat}
                            </span>
                            
                            {/* Category */}
                            {prestasi.kategori && (
                              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                {getKategoriIcon(prestasi.kategori)}
                                <span>{prestasi.kategori}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}      
      <Footer />
    
    </div>
  );
};

export default PrestasiSiswa;

