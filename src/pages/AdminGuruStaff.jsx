import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useSupabaseStorage } from '../hooks/useSupabaseStorage';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Trash2, Edit, Plus, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminGuruStaff() {
  const [guruStaff, setGuruStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { uploadFile, uploading } = useSupabaseStorage();
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    mapel: "",
    foto_url: "",
    fotoFile: null,
  });
  const navigate = useNavigate();

  // Daftar jabatan dengan urutan prioritas
  const jabatanOptions = [
    { value: "Kepala Sekolah", label: "Kepala Sekolah", urutan: 1 },
    { value: "Wakil Kepala Sekolah Kurikulum", label: "Wakil Kepala Sekolah Kurikulum", urutan: 2 },
    { value: "Wakil Kepala Sekolah Kesiswaan", label: "Wakil Kepala Sekolah Kesiswaan", urutan: 3 },
    { value: "Wakil Kepala Sekolah Sarana dan Prasarana", label: "Wakil Kepala Sekolah Sarana dan Prasarana", urutan: 4 },
    { value: "Wakil Kepala Sekolah Humas", label: "Wakil Kepala Sekolah Humas", urutan: 5 },
    { value: "Guru", label: "Guru", urutan: 6 },
    { value: "Staff", label: "Staff", urutan: 7 }
  ];

  const getUrutanByJabatan = (jabatan) => {
    const found = jabatanOptions.find(option => option.value === jabatan);
    return found ? found.urutan : 999;
  };

  useEffect(() => {
    fetchGuruStaff();
  }, []);

  const fetchGuruStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('guru_staff')
        .select('*')
        .order('urutan', { ascending: true });

      if (error) throw error;
      
      // Sort by jabatan priority if urutan is the same
      const sortedData = (data || []).sort((a, b) => {
        if (a.urutan === b.urutan) {
          return getUrutanByJabatan(a.jabatan) - getUrutanByJabatan(b.jabatan);
        }
        return a.urutan - b.urutan;
      });
      
      setGuruStaff(sortedData);
    } catch (error) {
      console.error('Error fetching guru staff:', error);
      toast.error('Gagal memuat data guru & staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let finalFormData = { ...formData };

      if (formData.fotoFile) {
        const uploadResult = await uploadFile(formData.fotoFile, 'images', `guru-staff/${Date.now()}-${formData.fotoFile.name}`);
        if (uploadResult.success) {
          finalFormData.foto_url = uploadResult.data.publicUrl;
        } else {
          throw new Error("Gagal mengunggah foto: " + uploadResult.error);
        }
      }

      // Remove file object from final data
      delete finalFormData.fotoFile;

      // Set urutan based on jabatan
      const urutan = getUrutanByJabatan(finalFormData.jabatan);

      const dataToSave = {
        ...finalFormData,
        urutan: urutan
      };

      if (editingItem) {
        const { error } = await supabase
          .from("guru_staff")
          .update(dataToSave)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast.success("Data guru/staff berhasil diperbarui");
      } else {
        const { error } = await supabase
          .from("guru_staff")
          .insert([dataToSave]);

        if (error) throw error;
        toast.success("Data guru/staff berhasil ditambahkan");
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ nama: "", jabatan: "", mapel: "", foto_url: "", fotoFile: null });
      fetchGuruStaff();
    } catch (error) {
      console.error('Error saving guru staff:', error);
      toast.error('Gagal menyimpan data guru/staff');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      jabatan: item.jabatan,
      mapel: item.mapel || "",
      foto_url: item.foto_url || "",
      fotoFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const { error } = await supabase
        .from('guru_staff')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Data guru/staff berhasil dihapus');
      fetchGuruStaff();
    } catch (error) {
      console.error('Error deleting guru staff:', error);
      toast.error('Gagal menghapus data guru/staff');
    }
  };

  const resetForm = () => {
    setFormData({ nama: "", jabatan: "", mapel: "", foto_url: "", fotoFile: null });
    setEditingItem(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Kelola Guru & Staff</h1>
              <p className="text-gray-600">Manajemen data guru dan staff sekolah</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Guru/Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Guru/Staff' : 'Tambah Guru/Staff Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="jabatan">Jabatan</Label>
                  <Select 
                    value={formData.jabatan} 
                    onValueChange={(value) => setFormData({ ...formData, jabatan: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatanOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    Urutan tampil akan otomatis disesuaikan berdasarkan jabatan
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="mapel">Mata Pelajaran</Label>
                  <Input
                    id="mapel"
                    value={formData.mapel}
                    onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
                    placeholder="Mata pelajaran yang diampu (opsional)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="foto_url">Foto</Label>
                  <Input
                    id="foto_url"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, fotoFile: e.target.files[0] })}
                  />
                  {formData.foto_url && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Foto saat ini:</p>
                      <img src={formData.foto_url} alt="Preview" className="max-w-xs h-auto rounded-md" />
                    </div>
                  )}
                  {uploading && <p className="text-sm text-blue-500 mt-2">Mengunggah foto...</p>}
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
                    {uploading ? 'Mengunggah...' : (editingItem ? 'Perbarui' : 'Simpan')}
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
                  <p className="text-sm font-medium text-gray-600">Total Guru & Staff</p>
                  <p className="text-2xl font-bold text-gray-900">{guruStaff.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Guru</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guruStaff.filter(item => 
                      item.jabatan.toLowerCase().includes('guru') || 
                      item.jabatan.toLowerCase().includes('kepala')
                    ).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Staff</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guruStaff.filter(item => 
                      item.jabatan.toLowerCase().includes('staff')
                    ).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guru Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Guru & Staff</CardTitle>
          </CardHeader>
          <CardContent>
            {guruStaff.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada data guru & staff</h3>
                <p className="text-gray-600 mb-4">Mulai dengan menambahkan data guru atau staff</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Guru/Staff
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guruStaff.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {item.foto_url && (
                          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 overflow-hidden">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.nama}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {item.jabatan}
                        </p>
                        {item.mapel && (
                          <p className="text-gray-600 text-sm mb-2">
                            {item.mapel}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Urutan: {item.urutan}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
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

