import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { User, Mail, Phone, Award } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';

const GuruStaff = () => {
  const { documents: guruStaffData, loading } = useFirestore('guru_staff');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (guruStaffData.length > 0) {
      // Sort by urutan (order) field
      const sorted = [...guruStaffData].sort((a, b) => (a.urutan || 999) - (b.urutan || 999));
      setSortedData(sorted);
    }
  }, [guruStaffData]);

  // Default data if no data from Firestore
  const defaultData = [
    {
      id: '1',
      nama: 'Dr. Siti Nurhaliza, M.Pd',
      jabatan: 'Kepala Sekolah',
      mapel: '-',
      fotoUrl: '',
      urutan: 1
    },
    {
      id: '2',
      nama: 'Drs. Ahmad Wijaya, M.Pd',
      jabatan: 'Wakil Kepala Sekolah',
      mapel: 'Matematika',
      fotoUrl: '',
      urutan: 2
    },
    {
      id: '3',
      nama: 'Sari Indrawati, S.Pd',
      jabatan: 'Guru',
      mapel: 'Bahasa Indonesia',
      fotoUrl: '',
      urutan: 3
    },
    {
      id: '4',
      nama: 'Budi Santoso, S.Pd',
      jabatan: 'Guru',
      mapel: 'IPA',
      fotoUrl: '',
      urutan: 4
    },
    {
      id: '5',
      nama: 'Rina Marlina, S.Pd',
      jabatan: 'Guru',
      mapel: 'Bahasa Inggris',
      fotoUrl: '',
      urutan: 5
    },
    {
      id: '6',
      nama: 'Hendra Kusuma, S.Pd',
      jabatan: 'Guru',
      mapel: 'IPS',
      fotoUrl: '',
      urutan: 6
    },
    {
      id: '7',
      nama: 'Maya Sari, S.Pd',
      jabatan: 'Guru',
      mapel: 'Seni Budaya',
      fotoUrl: '',
      urutan: 7
    },
    {
      id: '8',
      nama: 'Agus Priyanto, S.Pd',
      jabatan: 'Guru',
      mapel: 'Pendidikan Jasmani',
      fotoUrl: '',
      urutan: 8
    },
    {
      id: '9',
      nama: 'Dewi Lestari, S.Kom',
      jabatan: 'Staff TU',
      mapel: '-',
      fotoUrl: '',
      urutan: 9
    },
    {
      id: '10',
      nama: 'Rudi Hartono',
      jabatan: 'Staff Perpustakaan',
      mapel: '-',
      fotoUrl: '',
      urutan: 10
    }
  ];

  const dataToShow = sortedData.length > 0 ? sortedData : defaultData;

  const getJabatanColor = (jabatan) => {
    if (jabatan.includes('Kepala Sekolah')) return 'bg-red-100 text-red-800';
    if (jabatan.includes('Wakil')) return 'bg-orange-100 text-orange-800';
    if (jabatan.includes('Guru')) return 'bg-blue-100 text-blue-800';
    if (jabatan.includes('Staff')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data guru dan staff...</p>
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
              Guru & Staff
            </h1>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dataToShow.map((person) => (
              <div 
                key={person.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {/* Photo */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  {person.fotoUrl || person.foto_url ? (
                    <img 
                      src={person.fotoUrl || person.foto_url} 
                      alt={person.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center ${person.fotoUrl || person.foto_url ? 'hidden' : ''}`}>
                    <span className="text-2xl font-bold text-white">
                      {getInitials(person.nama)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {person.nama}
                  </h3>

                  {/* Position */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getJabatanColor(person.jabatan)}`}>
                      {person.jabatan}
                    </span>
                  </div>

                  {/* Subject */}
                  {person.mapel && person.mapel !== '-' && (
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">{person.mapel}</span>
                    </div>
                  )}

                  {/* Contact Info (if available) */}
                  {person.email && (
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{person.email}</span>
                    </div>
                  )}

                  {person.telepon && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{person.telepon}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GuruStaff;

