
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowRight, Star, Users, Trophy, Zap, Calendar, User, Award, BookOpen, Lightbulb, Target } from 'lucide-react';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { motion } from 'framer-motion';

const Beranda = () => {
  const { documents: berita } = useSupabase('berita');
  const { documents: guruStaff } = useSupabase('guru_staff');
  const { documents: prestasi } = useSupabase('prestasi');

  useEffect(() => {
    document.title = 'SMP Negeri 35 Bandar Lampung - Sekolah Berkualitas di Bandar Lampung';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SMP Negeri 35 Bandar Lampung adalah sekolah menengah pertama berkualitas yang berkomitmen membangun generasi berprestasi, inovatif, semangat, dan aktif. Informasi lengkap profil sekolah, berita, guru, prestasi siswa.');
    }
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 min-h-[80vh] flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="text-white space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Selamat Datang di
                  <span className="block text-yellow-400">SMP Negeri 35</span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold">
                    Bandar Lampung
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                  Membangun generasi muda yang <b>cerdas, berkarakter, dan berdaya saing global</b> melalui pendidikan berkualitas dan lingkungan belajar yang inspiratif.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/berita">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-4 text-lg group transition-all duration-300 transform hover:scale-105"
                  >
                    Berita Sekolah
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/kontak">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-0 text-blue-700 font-semibold px-8 py-4 text-lg group hover:text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="assets/Photo-Smp-Negeri-35-Bdl-Beranda.jpeg"
                  alt="Siswa SMP Negeri 35"
                  className="w-full max-w-max mx-auto rounded-2xl shadow-2xl border-4 border-white/20"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visi dan Misi Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Membentuk generasi penerus bangsa yang unggul, berakhlak mulia, dan siap menghadapi masa depan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-4 text-blue-600">
                <Target className="h-10 w-10" />
                <h3 className="text-2xl font-bold">Visi</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Meningkatkan prestasi siswa berdasarkan iman dan takwa.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-4 text-green-600">
                <Lightbulb className="h-10 w-10" />
                <h3 className="text-2xl font-bold">Misi</h3>
              </div>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-5">
                <li>Agar peserta didik menjadi siswa yang berprestasi.</li>
                <li>Menjadi anak yang berguna bagi nusa dan bangsa.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Berita Sekolah Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Berita Sekolah Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informasi terkini seputar kegiatan dan perkembangan SMP Negeri 35 Bandar Lampung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
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
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
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
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/berita">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 transition-all duration-300 transform hover:scale-105"
              >
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Guru dan Staff Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Pengajar dan Staff
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim pendidik dan tenaga kependidikan yang berpengalaman dan berkualitas
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {guruStaff.slice(0, 5).map((guru) => (
              <motion.div
                key={guru.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-center group"
              >
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {guru.foto_url ? (
                    <img
                      src={guru.foto_url}
                      alt={guru.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      <User className="h-16 w-16" />
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/guru-staff">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 transition-all duration-300 transform hover:scale-105"
              >
                Lihat Semua Guru & Staff
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Prestasi Siswa Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prestasi Gemilang Siswa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pencapaian membanggakan siswa-siswi SMP Negeri 35 Bandar Lampung di berbagai bidang
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestasi.slice(0, 6).map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group"
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/prestasi-siswa">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 transition-all duration-300 transform hover:scale-105"
              >
                Lihat Semua Prestasi
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Inti Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SMP Negeri 35 Bandar Lampung berkomitmen untuk membentuk siswa yang memiliki karakter unggul
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center group"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-white rounded-full group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Beranda;

