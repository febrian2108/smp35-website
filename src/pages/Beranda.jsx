import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowRight, Star, Users, Trophy, Zap, Calendar, User, Award } from 'lucide-react';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useSupabase } from '../hooks/useSupabase';

const Beranda = () => {
  const { documents: berita } = useSupabase('berita');
  const { documents: guruStaff } = useSupabase('guru_staff');
  const { documents: prestasi } = useSupabase('prestasi');

  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = 'SMP Negeri 35 Bandar Lampung - Sekolah Berkualitas di Bandar Lampung';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SMP Negeri 35 Bandar Lampung adalah sekolah menengah pertama berkualitas yang berkomitmen membangun generasi berprestasi, inovatif, semangat, dan aktif. Informasi lengkap profil sekolah, berita, guru, prestasi siswa.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'SMP Negeri 35 Bandar Lampung - Sekolah Berkualitas di Bandar Lampung');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'SMP Negeri 35 Bandar Lampung adalah sekolah menengah pertama berkualitas yang berkomitmen membangun generasi berprestasi, inovatif, semangat, dan aktif.');
    }
  }, []);

  const values = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Berprestasi",
      description: "Meraih prestasi akademik dan non-akademik yang membanggakan"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Inovatif",
      description: "Mengembangkan kreativitas dan inovasi dalam pembelajaran"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Semangat",
      description: "Memiliki semangat tinggi dalam menuntut ilmu"
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Aktif",
      description: "Aktif dalam kegiatan pembelajaran dan ekstrakurikuler"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 min-h-screen flex items-center overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Selamat Datang di Website
                  <span className="block text-yellow-300">
                    SMP Negeri 35
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl">
                    Bandar Lampung
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Membangun generasi yang berprestasi, inovatif, semangat, dan aktif 
                  dalam menghadapi tantangan masa depan dengan pendidikan berkualitas.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/berita">
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-4 text-lg group"
                  >
                    Berita Sekolah
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="assets/Photo-Smp-Negeri-35-Bdl-Beranda.jpeg"
                  alt="Siswa SMP Negeri 35" 
                  className="w-full max-w-max mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Berita Sekolah Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Berita Sekolah
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informasi terkini seputar kegiatan dan perkembangan SMP Negeri 35 Bandar Lampung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {item.gambar_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.gambar_url} 
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.deskripsi}
                  </p>
                  <Link 
                    to={`/berita/${item.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/berita">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4"
              >
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Guru dan Staff Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guru dan Staff
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim pendidik dan tenaga kependidikan yang berpengalaman dan berkualitas
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {guruStaff.slice(0, 5).map((guru) => (
              <div 
                key={guru.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center group"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  {guru.foto_url ? (
                    <img 
                      src={guru.foto_url} 
                      alt={guru.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {guru.nama}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {guru.jabatan}
                  </p>
                  {guru.mapel && (
                    <p className="text-gray-600 text-sm">
                      {guru.mapel}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/guru-staff">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4"
              >
                Lihat Semua Guru & Staff
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prestasi Siswa Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prestasi Siswa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pencapaian membanggakan siswa-siswi SMP Negeri 35 Bandar Lampung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestasi.slice(0, 6).map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-yellow-500 mr-3" />
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {item.tingkat}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {item.tahun}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.nama}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {item.deskripsi}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {item.kategori}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/prestasi-siswa">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4"
              >
                Lihat Semua Prestasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SMP Negeri 35 Bandar Lampung berkomitmen untuk membentuk siswa yang memiliki karakter unggul
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center group hover:-translate-y-2 transform transition-transform"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gray-50 rounded-full group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default Beranda;

