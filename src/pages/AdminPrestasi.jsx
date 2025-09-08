import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Trash2, Edit, Plus, Trophy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminPrestasi() {
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tahun: new Date().getFullYear(),
    nama: '',
    deskripsi: '',
    tingkat: '',
    kategori: ''
  });
  const navigate = useNavigate();

  const tingkatOptions = [
    'Sekolah',
    'Kecamatan', 
    'Kota',
    'Provinsi',
    'Nasional',
    'Internasional'
  ];

  const kategoriOptions = [
    'Akademik',
    'Olahraga',
    'Seni',
    'Lainnya'
  ];

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const fetchPrestasi = async () => {
    try {
      const { data, error } = await supabase
        .from('prestasi')
        .select('*')
        .order('tahun', { ascending: false });

      if (error) throw error;
      setPrestasi(data || []);
    } catch (error) {
      console.error('Error fetching prestasi:', error);
      toast.error('Gagal memuat data prestasi');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSave = {
        ...formData,
        tahun: parseInt(formData.tahun)
      };

      if (editingItem) {
        const { error } = await supabase
          .from('prestasi')
          .update(dataToSave)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Prestasi berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('prestasi')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Prestasi berhasil ditambahkan');
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ 
        tahun: new Date().getFullYear(), 
        nama: '', 
        deskripsi: '', 
        tingkat: '', 
        kategori: '' 
      });
      fetchPrestasi();
    } catch (error) {
      console.error('Error saving prestasi:', error);
      toast.error('Gagal menyimpan prestasi');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      tahun: item.tahun,
      nama: item.nama,
      deskripsi: item.deskripsi || '',
      tingkat: item.tingkat,
      kategori: item.kategori
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) return;

    try {
      const { error } = await supabase
        .from('prestasi')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Prestasi berhasil dihapus');
      fetchPrestasi();
    } catch (error) {
      console.error('Error deleting prestasi:', error);
      toast.error('Gagal menghapus prestasi');
    }
  };

  const resetForm = () => {
    setFormData({ 
      tahun: new Date().getFullYear(), 
      nama: '', 
      deskripsi: '', 
      tingkat: '', 
      kategori: '' 
    });
    setEditingItem(null);
  };

  const getTingkatColor = (tingkat) => {
    const colors = {
      'Sekolah': 'bg-gray-100 text-gray-800',
      'Kecamatan': 'bg-blue-100 text-blue-800',
      'Kota': 'bg-green-100 text-green-800',
      'Provinsi': 'bg-yellow-100 text-yellow-800',
      'Nasional': 'bg-red-100 text-red-800',
      'Internasional': 'bg-purple-100 text-purple-800'
    };
    return colors[tingkat] || 'bg-gray-100 text-gray-800';
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      'Akademik': 'bg-blue-100 text-blue-800',
      'Olahraga': 'bg-green-100 text-green-800',
      'Seni': 'bg-purple-100 text-purple-800',
      'Lainnya': 'bg-gray-100 text-gray-800'
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
              <h1 className="text-3xl font-bold text-gray-900">Kelola Prestasi</h1>
              <p className="text-gray-600">Manajemen prestasi siswa sekolah</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Prestasi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tahun">Tahun</Label>
                    <Input
                      id="tahun"
                      type="number"
                      value={formData.tahun}
                      onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                      placeholder="2024"
                      min="2000"
                      max="2030"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tingkat">Tingkat</Label>
                    <Select
                      value={formData.tingkat}
                      onValueChange={(value) => setFormData({ ...formData, tingkat: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat" />
                      </SelectTrigger>
                      <SelectContent>
                        {tingkatOptions.map((tingkat) => (
                          <SelectItem key={tingkat} value={tingkat}>
                            {tingkat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                
                <div>
                  <Label htmlFor="nama">Nama Prestasi</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: Juara 1 Olimpiade Matematika"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Deskripsi detail prestasi"
                    rows={4}
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
                  <p className="text-sm font-medium text-gray-600">Total Prestasi</p>
                  <p className="text-2xl font-bold text-gray-900">{prestasi.length}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nasional</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prestasi.filter(item => item.tingkat === 'Nasional').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Provinsi</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prestasi.filter(item => item.tingkat === 'Provinsi').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tahun Ini</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prestasi.filter(item => item.tahun === new Date().getFullYear()).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prestasi List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Prestasi</CardTitle>
          </CardHeader>
          <CardContent>
            {prestasi.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada prestasi</h3>
                <p className="text-gray-600 mb-4">Mulai dengan menambahkan prestasi pertama</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Prestasi
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {prestasi.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-gray-900">
                            {item.tahun}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTingkatColor(item.tingkat)}`}>
                            {item.tingkat}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(item.kategori)}`}>
                            {item.kategori}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.nama}
                        </h3>
                        
                        {item.deskripsi && (
                          <p className="text-gray-600 mb-3">
                            {item.deskripsi}
                          </p>
                        )}
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

