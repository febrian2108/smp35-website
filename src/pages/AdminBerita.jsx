import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useSupabaseStorage } from '../hooks/useSupabaseStorage';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Trash2, Edit, Plus, Eye, ArrowLeft, Upload, X, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState(null);
  const { uploadFile, uploading } = useSupabaseStorage();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    isi: "",
    gambar_urls: [],
    gambarFiles: [],
    file_url: "",
    file_name: "",
    file_type: "",
    documentFile: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBerita(data || []);
    } catch (error) {
      console.error('Error fetching berita:', error);
      toast.error('Gagal memuat data berita');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (files) => {
    const newFiles = Array.from(files);
    setFormData(prev => ({
      ...prev,
      gambarFiles: [...prev.gambarFiles, ...newFiles]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gambarFiles: prev.gambarFiles.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gambar_urls: prev.gambar_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let finalFormData = { ...formData };
      let uploadedImages = [...formData.gambar_urls];

      // Upload new images if provided
      if (formData.gambarFiles && formData.gambarFiles.length > 0) {
        for (const file of formData.gambarFiles) {
          const uploadResult = await uploadFile(file, 'images', `berita/${Date.now()}-${file.name}`);
          if (uploadResult.success) {
            uploadedImages.push({
              url: uploadResult.data.publicUrl,
              name: file.name,
              size: file.size
            });
          } else {
            throw new Error("Gagal mengunggah gambar: " + uploadResult.error);
          }
        }
      }

      // Upload document if provided
      if (formData.documentFile) {
        const uploadResult = await uploadFile(formData.documentFile, 'documents', `berita/${Date.now()}-${formData.documentFile.name}`);
        if (uploadResult.success) {
          finalFormData.file_url = uploadResult.data.publicUrl;
          finalFormData.file_name = formData.documentFile.name;
          finalFormData.file_type = formData.documentFile.type;
        } else {
          throw new Error("Gagal mengunggah dokumen: " + uploadResult.error);
        }
      }

      // Set the uploaded images array
      finalFormData.gambar_urls = uploadedImages;
      
      // Set backward compatibility for single image
      if (uploadedImages.length > 0) {
        finalFormData.gambar_url = uploadedImages[0].url;
      }

      // Remove file objects from final data
      delete finalFormData.gambarFiles;
      delete finalFormData.documentFile;

      if (editingBerita) {
        const { error } = await supabase
          .from("berita")
          .update(finalFormData)
          .eq("id", editingBerita.id);

        if (error) throw error;
        toast.success("Berita berhasil diperbarui");
      } else {
        const { error } = await supabase
          .from("berita")
          .insert([finalFormData]);

        if (error) throw error;
        toast.success("Berita berhasil ditambahkan");
      }

      setIsDialogOpen(false);
      setEditingBerita(null);
      setFormData({ 
        judul: "", 
        deskripsi: "", 
        isi: "", 
        gambar_urls: [],
        gambarFiles: [],
        file_url: "",
        file_name: "",
        file_type: "",
        documentFile: null,
      });
      fetchBerita();
    } catch (error) {
      console.error('Error saving berita:', error);
      toast.error('Gagal menyimpan berita: ' + error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingBerita(item);
    
    // Parse gambar_urls if it exists, otherwise use single gambar_url
    let existingImages = [];
    if (item.gambar_urls && Array.isArray(item.gambar_urls)) {
      existingImages = item.gambar_urls;
    } else if (item.gambar_url) {
      existingImages = [{
        url: item.gambar_url,
        name: 'image',
        size: 0
      }];
    }

    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || "",
      isi: item.isi,
      gambar_urls: existingImages,
      gambarFiles: [],
      file_url: item.file_url || "",
      file_name: item.file_name || "",
      file_type: item.file_type || "",
      documentFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    try {
      const { error } = await supabase
        .from('berita')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Berita berhasil dihapus');
      fetchBerita();
    } catch (error) {
      console.error('Error deleting berita:', error);
      toast.error('Gagal menghapus berita');
    }
  };

  const resetForm = () => {
    setFormData({ 
      judul: "", 
      deskripsi: "", 
      isi: "", 
      gambar_urls: [],
      gambarFiles: [],
      file_url: "",
      file_name: "",
      file_type: "",
      documentFile: null,
    });
    setEditingBerita(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
              <p className="text-gray-600">Manajemen berita dan artikel sekolah</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Berita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBerita ? 'Edit Berita' : 'Tambah Berita Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="judul">Judul Berita</Label>
                  <Input
                    id="judul"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    placeholder="Masukkan judul berita"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Deskripsi singkat berita"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="isi">Isi Berita</Label>
                  <Textarea
                    id="isi"
                    value={formData.isi}
                    onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                    placeholder="Tulis isi berita lengkap di sini"
                    rows={8}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gambar_files">Gambar (Multiple)</Label>
                  <Input
                    id="gambar_files"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                  
                  {/* Existing Images */}
                  {formData.gambar_urls.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Gambar yang sudah ada:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.gambar_urls.map((img, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={img.url} 
                              alt={`Existing ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* New Images Preview */}
                  {formData.gambarFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Gambar baru yang akan diupload:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.gambarFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md">
                              {file.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {uploading && <p className="text-sm text-blue-500 mt-2">Mengunggah gambar...</p>}
                </div>

                <div>
                  <Label htmlFor="document_file">File Lampiran (PDF - Opsional)</Label>
                  <Input
                    id="document_file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, documentFile: e.target.files[0] })}
                  />
                  {formData.file_url && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">File saat ini:</p>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Upload className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{formData.file_name}</span>
                      </div>
                    </div>
                  )}
                  {formData.documentFile && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">File baru yang akan diupload:</p>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                        <Upload className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{formData.documentFile.name}</span>
                      </div>
                    </div>
                  )}
                  {uploading && <p className="text-sm text-blue-500 mt-2">Mengunggah dokumen...</p>}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Mengunggah...' : (editingBerita ? 'Perbarui' : 'Simpan')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Berita</p>
                  <p className="text-2xl font-bold text-gray-900">{berita.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bulan Ini</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {berita.filter(item => {
                      const itemDate = new Date(item.created_at);
                      const now = new Date();
                      return itemDate.getMonth() === now.getMonth() && 
                             itemDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terbaru</p>
                  <p className="text-sm text-gray-900">
                    {berita.length > 0 
                      ? new Date(berita[0].created_at).toLocaleDateString('id-ID')
                      : 'Belum ada'
                    }
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Edit className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Berita List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Berita</CardTitle>
          </CardHeader>
          <CardContent>
            {berita.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada berita</h3>
                <p className="text-gray-600 mb-4">Mulai dengan menambahkan berita pertama</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Berita
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {berita.map((item) => {
                  // Get images count
                  let imageCount = 0;
                  if (item.gambar_urls && Array.isArray(item.gambar_urls)) {
                    imageCount = item.gambar_urls.length;
                  } else if (item.gambar_url) {
                    imageCount = 1;
                  }

                  return (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.judul}
                          </h3>
                          {item.deskripsi && (
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {item.deskripsi}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              {new Date(item.created_at).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span>•</span>
                            <span>{item.isi.length} karakter</span>
                            {imageCount > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Image className="h-3 w-3" />
                                  {imageCount} gambar
                                </span>
                              </>
                            )}
                            {item.file_url && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Upload className="h-3 w-3" />
                                  File lampiran
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

