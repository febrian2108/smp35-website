import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Download, X, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '../lib/supabase';
import JSZip from 'jszip';

const BeritaDetail = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [images, setImages] = useState([]);

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

          // Process images
          let processedImages = [];
          if (data.gambar_urls && Array.isArray(data.gambar_urls)) {
            processedImages = data.gambar_urls;
          } else if (data.gambar_url) {
            processedImages = [{
              url: data.gambar_url,
              name: 'image',
              size: 0
            }];
          }
          setImages(processedImages);

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

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Gagal mengunduh file');
    }
  };

  const handleDownloadAllImages = async () => {
    if (images.length === 0) {
      alert('Tidak ada gambar untuk diunduh');
      return;
    }

    try {
      const zip = new JSZip();
      const promises = images.map(async (img, index) => {
        const response = await fetch(img.url);
        const blob = await response.blob();
        const fileName = img.name || `image-${index + 1}.jpg`;
        zip.file(fileName, blob);
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${berita.judul}-images.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading images:', error);
      alert('Gagal mengunduh gambar');
    }
  };

  const handleZoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setImageZoom(1);
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setImageViewerOpen(true);
    resetZoom();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
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

            <div className="flex items-center gap-2">
              {images.length > 0 && (
                <Button
                  onClick={handleDownloadAllImages}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Unduh Gambar</span>
                </Button>
              )}

              {berita.file_url && (
                <Button
                  onClick={() => handleDownloadFile(berita.file_url, berita.file_name || 'dokumen.pdf')}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Unduh File</span>
                </Button>
              )}

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
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Main Image and Content */}
              <div className="lg:col-span-2">
                {/* Featured Image */}
                {images.length > 0 && (
                  <div className="mb-8">
                    <div
                      className="relative cursor-pointer group"
                      onClick={() => openImageViewer(0)}
                    >
                      <img
                        src={images[0].url}
                        alt={berita.judul}
                        className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg transition-transform group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                        <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          1 / {images.length}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Description */}
                {berita.deskripsi && (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ringkasan</h3>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {berita.deskripsi}
                    </p>

                {/* Article Content */}
                <article className="rounded-xl mt-6 text-justify ">
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
                    <div className="mt-8 pt-8 border-t">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600">Kategori:</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {berita.kategori}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
                  </div>
                )}

                {/* Image Gallery */}
                {images.length > 1 && (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeri Foto</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative cursor-pointer group"
                          onClick={() => openImageViewer(index)}
                        >
                          <img
                            src={img.url}
                            alt={`Gambar ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Downloads */}
                {berita.file_url && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">File Lampiran</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {berita.file_name || 'Dokumen Lampiran'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {berita.file_type || 'PDF'}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDownloadFile(berita.file_url, berita.file_name || 'dokumen.pdf')}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

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

      {/* Image Viewer Modal */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-20 w-full h-full max-h-screen p-0 bg-black/30">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Image Viewer Controls */}
            <div className="absolute top-4 right-4 z-50 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomOut}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={resetZoom}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                {Math.round(imageZoom * 100)}%
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomIn}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDownloadFile(images[currentImageIndex]?.url, images[currentImageIndex]?.name || `image-${currentImageIndex + 1}.jpg`)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setImageViewerOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  ←
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  →
                </Button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-3 py-1 rounded">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Image */}
            <div className="overflow-auto max-w-full max-h-full flex items-center justify-center">
              {images[currentImageIndex] && (
                <img
                  src={images[currentImageIndex].url}
                  alt={`Gambar ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${imageZoom})`,
                    transformOrigin: 'center'
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default BeritaDetail;

