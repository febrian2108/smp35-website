import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirestore } from '../hooks/useFirestore';
import Footer from '../components/Footer';

const BeritaSekolah = () => {
  const { documents: berita, loading } = useFirestore('berita');
  const [filteredBerita, setFilteredBerita] = useState([]);
  const [sortOrder, setSortOrder] = useState('terbaru');

  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = 'Berita Sekolah - SMP Negeri 35 Bandar Lampung';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Berita terbaru dan informasi kegiatan SMP Negeri 35 Bandar Lampung. Dapatkan update terkini tentang prestasi siswa, kegiatan sekolah, dan pengumuman penting.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Berita Sekolah - SMP Negeri 35 Bandar Lampung');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Berita terbaru dan informasi kegiatan SMP Negeri 35 Bandar Lampung. Dapatkan update terkini tentang prestasi siswa, kegiatan sekolah, dan pengumuman penting.');
    }
  }, []);

  useEffect(() => {
    if (berita.length > 0) {
      const sorted = [...berita].sort((a, b) => {
        const dateA = new Date(a.tanggal);
        const dateB = new Date(b.tanggal);
        
        if (sortOrder === 'terbaru') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
      setFilteredBerita(sorted);
    }
  }, [berita, sortOrder]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat berita...</p>
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
              Berita Sekolah
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Urutkan berdasarkan:</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={sortOrder === 'terbaru' ? 'default' : 'outline'}
                onClick={() => setSortOrder('terbaru')}
                size="sm"
              >
                Terbaru
              </Button>
              <Button
                variant={sortOrder === 'terlama' ? 'default' : 'outline'}
                onClick={() => setSortOrder('terlama')}
                size="sm"
              >
                Terlama
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBerita.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum Ada Berita
              </h3>
              <p className="text-gray-600">
                Berita sekolah akan ditampilkan di sini ketika tersedia.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBerita.map((item) => (
                <article 
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {item.gambarUrl ? (
                      <img 
                        src={item.gambarUrl} 
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(item.tanggal)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.judul}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {truncateText(item.deskripsi)}
                    </p>

                    {/* Read More Button */}
                    <Link 
                      to={`/berita/${item.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group/link"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
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

export default BeritaSekolah;

