import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Users, 
  Trophy, 
  Star, 
  BarChart3, 
  Calendar,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { documents: berita } = useFirestore('berita');
  const { documents: guruStaff } = useFirestore('guru_staff');
  const { documents: prestasi } = useFirestore('prestasi');
  const { documents: ekstrakurikuler } = useFirestore('ekstrakurikuler');

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      title: 'Kelola Berita',
      description: 'Tambah, edit, dan hapus berita sekolah',
      icon: <Newspaper className="h-8 w-8" />,
      path: '/admin/berita',
      color: 'bg-blue-500',
      count: berita.length
    },
    {
      title: 'Kelola Guru & Staff',
      description: 'Manajemen data guru dan staff sekolah',
      icon: <Users className="h-8 w-8" />,
      path: '/admin/guru-staff',
      color: 'bg-green-500',
      count: guruStaff.length
    },
    {
      title: 'Kelola Prestasi',
      description: 'Tambah dan kelola prestasi siswa',
      icon: <Trophy className="h-8 w-8" />,
      path: '/admin/prestasi',
      color: 'bg-yellow-500',
      count: prestasi.length
    },
    {
      title: 'Kelola Ekstrakurikuler',
      description: 'Manajemen kegiatan ekstrakurikuler',
      icon: <Star className="h-8 w-8" />,
      path: '/admin/ekstrakurikuler',
      color: 'bg-purple-500',
      count: ekstrakurikuler.length
    }
  ];

  const stats = [
    {
      title: 'Total Berita',
      value: berita.length,
      icon: <Newspaper className="h-6 w-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'Guru & Staff',
      value: guruStaff.length,
      icon: <Users className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      title: 'Prestasi',
      value: prestasi.length,
      icon: <Trophy className="h-6 w-6" />,
      color: 'text-yellow-600'
    },
    {
      title: 'Ekstrakurikuler',
      value: ekstrakurikuler.length,
      icon: <Star className="h-6 w-6" />,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
              <p className="text-gray-600">
                Selamat datang, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline">
                  Lihat Website
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Menu Utama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${item.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-400">
                      {item.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent News */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Berita Terbaru
              </h3>
              <Link to="/admin/berita">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {berita.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.judul}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.tanggal).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
              {berita.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada berita
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Akses Cepat
            </h3>
            <div className="space-y-3">
              <Link to="/admin/berita" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Newspaper className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900 font-medium">Tambah Berita Baru</span>
              </Link>
              <Link to="/admin/guru-staff" className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-green-900 font-medium">Tambah Guru/Staff</span>
              </Link>
              <Link to="/admin/prestasi" className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-900 font-medium">Tambah Prestasi</span>
              </Link>
              <Link to="/admin/ekstrakurikuler" className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="text-purple-900 font-medium">Tambah Ekstrakurikuler</span>
              </Link>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi Sistem
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Terakhir Login</p>
              <p className="font-medium text-gray-900">
                {new Date().toLocaleDateString('id-ID')}
              </p>
            </div>
            <div>
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Status Sistem</p>
              <p className="font-medium text-green-600">Online</p>
            </div>
            <div>
              <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Versi</p>
              <p className="font-medium text-gray-900">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

