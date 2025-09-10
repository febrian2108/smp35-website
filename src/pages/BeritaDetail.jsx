import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '../lib/supabase';

const BeritaDetail = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      if (id) {
        try {
          const { data, error } = await supabase
            .from('berita')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          setBerita(data);
        } catch (error) {
          console.error('Error fetching berita:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBerita();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: berita.judul,
        text: berita.deskripsi,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
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

  if (error || !berita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">Maaf, berita yang Anda cari tidak dapat ditemukan.</p>
          <Link to="/berita">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/berita"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Berita</span>
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {berita.judul}
              </h1>
              
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(berita.tanggal || berita.created_at)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Bagikan</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {berita.gambar_url && (
              <div className="mb-8">
                <img 
                  src={berita.gambar_url} 
                  alt={berita.judul}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <article className="bg-white rounded-xl shadow-md p-8 md:p-12">
              {/* Description */}
              <div className="mb-8">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  {berita.deskripsi}
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: berita.isi ? berita.isi.replace(/\n/g, '<br />') : '' 
                  }}
                />
              </div>

              {/* Tags or Categories (if available) */}
              {berita.kategori && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Kategori:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {berita.kategori}
                    </span>
                  </div>
                </div>
              )}
            </article>

            {/* Navigation */}
            <div className="mt-12 flex justify-center">
              <Link to="/berita">
                <Button size="lg" className="px-8">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Lihat Berita Lainnya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default BeritaDetail;

