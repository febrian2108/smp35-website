import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Trash2, Edit, Plus, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    isi: '',
    gambar_url: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingBerita) {
        const { error } = await supabase
          .from('berita')
          .update(formData)
          .eq('id', editingBerita.id);

        if (error) throw error;
        toast.success('Berita berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('berita')
          .insert([formData]);

        if (error) throw error;
        toast.success('Berita berhasil ditambahkan');
      }

      setIsDialogOpen(false);
      setEditingBerita(null);
      setFormData({ judul: '', deskripsi: '', isi: '', gambar_url: '' });
      fetchBerita();
    } catch (error) {
      console.error('Error saving berita:', error);
      toast.error('Gagal menyimpan berita');
    }
  };

  const handleEdit = (item) => {
    setEditingBerita(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      isi: item.isi,
      gambar_url: item.gambar_url || ''
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
    setFormData({ judul: '', deskripsi: '', isi: '', gambar_url: '' });
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
            <DialogContent className="max-w-2xl">
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
                  <Label htmlFor="gambar_url">URL Gambar</Label>
                  <Input
                    id="gambar_url"
                    value={formData.gambar_url}
                    onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingBerita ? 'Perbarui' : 'Simpan'}
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
                {berita.map((item) => (
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

