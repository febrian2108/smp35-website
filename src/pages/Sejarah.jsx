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
  const defaultSejarah = `SMP Negeri 35 Bandar Lampung didirikan pada tahun 1985 sebagai bagian dari upaya pemerintah untuk meningkatkan akses pendidikan menengah pertama di wilayah Bandar Lampung. Sekolah ini berlokasi strategis di jantung kota, memungkinkan akses yang mudah bagi siswa dari berbagai daerah.

Pada awal berdirinya, SMP Negeri 35 hanya memiliki 6 ruang kelas dengan jumlah siswa sekitar 180 orang. Seiring berjalannya waktu, sekolah terus berkembang dan mengalami berbagai perbaikan fasilitas serta peningkatan kualitas pendidikan.

Tahun 1990-an menjadi periode penting dalam sejarah sekolah, dimana berbagai program unggulan mulai dikembangkan. Program ekstrakurikuler yang beragam mulai diperkenalkan untuk mengembangkan bakat dan minat siswa di luar bidang akademik.

Memasuki era 2000-an, SMP Negeri 35 mulai mengintegrasikan teknologi dalam proses pembelajaran. Laboratorium komputer pertama didirikan pada tahun 2003, diikuti dengan pemasangan jaringan internet pada tahun 2005.

Prestasi demi prestasi mulai diraih oleh siswa-siswa SMP Negeri 35, baik di tingkat kota, provinsi, maupun nasional. Hal ini membuktikan komitmen sekolah dalam memberikan pendidikan berkualitas dan mengembangkan potensi siswa secara optimal.

Saat ini, SMP Negeri 35 Bandar Lampung telah menjadi salah satu sekolah menengah pertama terkemuka di kota Bandar Lampung, dengan fasilitas yang lengkap dan tenaga pendidik yang berkualitas. Sekolah terus berkomitmen untuk memberikan pendidikan terbaik bagi generasi penerus bangsa.`;

  const milestones = [
    {
      year: '1985',
      title: 'Pendirian Sekolah',
      description: 'SMP Negeri 35 Bandar Lampung resmi didirikan dengan 6 ruang kelas',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      year: '1990',
      title: 'Pengembangan Program',
      description: 'Mulai mengembangkan program ekstrakurikuler dan kegiatan pengembangan bakat',
      icon: <Users className="h-6 w-6" />
    },
    {
      year: '2003',
      title: 'Era Digital',
      description: 'Pembangunan laboratorium komputer pertama dan integrasi teknologi',
      icon: <Clock className="h-6 w-6" />
    },
    {
      year: '2020',
      title: 'Sekolah Unggulan',
      description: 'Menjadi salah satu SMP terkemuka di Bandar Lampung dengan berbagai prestasi',
      icon: <Award className="h-6 w-6" />
    }
  ];

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
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Perjalanan panjang SMP Negeri 35 Bandar Lampung dalam memberikan pendidikan berkualitas
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <img
              src="/assets/tvfnONdBZzuB.jpg"
              alt="SMP Negeri 35 Bandar Lampung"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            />
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-6">
                  {(sejarah || defaultSejarah).split('\n\n').map((paragraph, index) => (
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

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Tonggak Sejarah Penting
            </h2>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  {/* Year */}
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">
                      {milestone.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              SMP Negeri 35 Hari Ini
            </h2>
            <p className="text-xl text-blue-200">
              Pencapaian dan kondisi sekolah saat ini
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">38+</div>
              <div className="text-lg font-semibold">Tahun Berpengalaman</div>
              <div className="text-blue-200 text-sm">Melayani pendidikan berkualitas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">500+</div>
              <div className="text-lg font-semibold">Siswa Aktif</div>
              <div className="text-blue-200 text-sm">Dari berbagai latar belakang</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">50+</div>
              <div className="text-lg font-semibold">Tenaga Pendidik</div>
              <div className="text-blue-200 text-sm">Guru dan staff berpengalaman</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">100+</div>
              <div className="text-lg font-semibold">Prestasi</div>
              <div className="text-blue-200 text-sm">Di berbagai bidang kompetisi</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sejarah;

