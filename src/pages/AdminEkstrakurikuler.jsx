import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Trash2, Edit, Plus, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminEkstrakurikuler() {
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    foto_url: '',
    kategori: '',
    jadwal: '',
    pembina: '',
    tempat: ''
  });
  const navigate = useNavigate();

  const kategoriOptions = [
    'Akademik',
    'Seni',
    'Olahraga',
    'Teknologi',
    'Sosial',
    'Karakter',
    'Media'
  ];

  useEffect(() => {
    fetchEkstrakurikuler();
  }, []);

  const fetchEkstrakurikuler = async () => {
    try {
      const { data, error } = await supabase
        .from('ekstrakurikuler')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEkstrakurikuler(data || []);
    } catch (error) {
      console.error('Error fetching ekstrakurikuler:', error);
      toast.error('Gagal memuat data ekstrakurikuler');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('ekstrakurikuler')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Ekstrakurikuler berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('ekstrakurikuler')
          .insert([formData]);

        if (error) throw error;
        toast.success('Ekstrakurikuler berhasil ditambahkan');
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ 
        nama: '', 
        deskripsi: '', 
        foto_url: '', 
        kategori: '', 
        jadwal: '', 
        pembina: '', 
        tempat: '' 
      });
      fetchEkstrakurikuler();
    } catch (error) {
      console.error('Error saving ekstrakurikuler:', error);
      toast.error('Gagal menyimpan ekstrakurikuler');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      deskripsi: item.deskripsi || '',
      foto_url: item.foto_url || '',
      kategori: item.kategori,
      jadwal: item.jadwal || '',
      pembina: item.pembina || '',
      tempat: item.tempat || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ekstrakurikuler ini?')) return;

    try {
      const { error } = await supabase
        .from('ekstrakurikuler')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Ekstrakurikuler berhasil dihapus');
      fetchEkstrakurikuler();
    } catch (error) {
      console.error('Error deleting ekstrakurikuler:', error);
      toast.error('Gagal menghapus ekstrakurikuler');
    }
  };

  const resetForm = () => {
    setFormData({ 
      nama: '', 
      deskripsi: '', 
      foto_url: '', 
      kategori: '', 
      jadwal: '', 
      pembina: '', 
      tempat: '' 
    });
    setEditingItem(null);
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      'Akademik': 'bg-blue-100 text-blue-800',
      'Seni': 'bg-purple-100 text-purple-800',
      'Olahraga': 'bg-green-100 text-green-800',
      'Teknologi': 'bg-indigo-100 text-indigo-800',
      'Sosial': 'bg-pink-100 text-pink-800',
      'Karakter': 'bg-yellow-100 text-yellow-800',
      'Media': 'bg-red-100 text-red-800'
    };
    return colors[kategori] || 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Kelola Ekstrakurikuler</h1>
              <p className="text-gray-600">Manajemen kegiatan ekstrakurikuler sekolah</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Ekstrakurikuler
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama">Nama Ekstrakurikuler</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      placeholder="Contoh: Pramuka, Basket, Paduan Suara"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="kategori">Kategori</Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {kategoriOptions.map((kategori) => (
                          <SelectItem key={kategori} value={kategori}>
                            {kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Deskripsi kegiatan ekstrakurikuler"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="foto_url">URL Foto</Label>
                  <Input
                    id="foto_url"
                    value={formData.foto_url}
                    onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    type="url"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jadwal">Jadwal</Label>
                    <Input
                      id="jadwal"
                      value={formData.jadwal}
                      onChange={(e) => setFormData({ ...formData, jadwal: e.target.value })}
                      placeholder="Contoh: Senin & Rabu, 15:00-17:00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tempat">Tempat</Label>
                    <Input
                      id="tempat"
                      value={formData.tempat}
                      onChange={(e) => setFormData({ ...formData, tempat: e.target.value })}
                      placeholder="Contoh: Lapangan Sekolah, Ruang Musik"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pembina">Pembina</Label>
                  <Input
                    id="pembina"
                    value={formData.pembina}
                    onChange={(e) => setFormData({ ...formData, pembina: e.target.value })}
                    placeholder="Nama guru pembina"
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
                    {editingItem ? 'Perbarui' : 'Simpan'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Ekstrakurikuler</p>
                  <p className="text-2xl font-bold text-gray-900">{ekstrakurikuler.length}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Olahraga</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ekstrakurikuler.filter(item => item.kategori === 'Olahraga').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Seni</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ekstrakurikuler.filter(item => item.kategori === 'Seni').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Akademik</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ekstrakurikuler.filter(item => item.kategori === 'Akademik').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ekstrakurikuler List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Ekstrakurikuler</CardTitle>
          </CardHeader>
          <CardContent>
            {ekstrakurikuler.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada ekstrakurikuler</h3>
                <p className="text-gray-600 mb-4">Mulai dengan menambahkan ekstrakurikuler pertama</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Ekstrakurikuler
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ekstrakurikuler.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {item.foto_url && (
                          <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                            <img
                              src={item.foto_url}
                              alt={item.nama}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.nama}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(item.kategori)}`}>
                            {item.kategori}
                          </span>
                        </div>
                        
                        {item.deskripsi && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {item.deskripsi}
                          </p>
                        )}
                        
                        <div className="space-y-1 text-sm text-gray-500">
                          {item.jadwal && (
                            <p><span className="font-medium">Jadwal:</span> {item.jadwal}</p>
                          )}
                          {item.tempat && (
                            <p><span className="font-medium">Tempat:</span> {item.tempat}</p>
                          )}
                          {item.pembina && (
                            <p><span className="font-medium">Pembina:</span> {item.pembina}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4 border-t">
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

