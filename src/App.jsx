import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Beranda from './pages/Beranda';
import BeritaSekolah from './pages/BeritaSekolah';
import BeritaDetail from './pages/BeritaDetail';
import Sejarah from './pages/Sejarah';
import VisiMisi from './pages/VisiMisi';
import GuruStaff from './pages/GuruStaff';
import PrestasiSiswa from './pages/PrestasiSiswa';
import Ekstrakurikuler from './pages/Ekstrakurikuler';
import KontakKami from './pages/KontakKami';

// Auth Pages
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Beranda />} />
                <Route path="/berita" element={<BeritaSekolah />} />
                <Route path="/berita/:id" element={<BeritaDetail />} />
                <Route path="/profil/sejarah" element={<Sejarah />} />
                <Route path="/profil/visi-misi" element={<VisiMisi />} />
                <Route path="/guru-staff" element={<GuruStaff />} />
                <Route path="/kesiswaan/prestasi" element={<PrestasiSiswa />} />
                <Route path="/kesiswaan/ekstrakurikuler" element={<Ekstrakurikuler />} />
                <Route path="/kontak" element={<KontakKami />} />
              </Routes>
            </>
          } />

          {/* Auth Routes (without Navbar) */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes (without public Navbar) */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/berita" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Kelola Berita</h2>
                  <p className="text-gray-600">Halaman ini sedang dalam pengembangan</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/guru-staff" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Kelola Guru & Staff</h2>
                  <p className="text-gray-600">Halaman ini sedang dalam pengembangan</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/prestasi" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Kelola Prestasi</h2>
                  <p className="text-gray-600">Halaman ini sedang dalam pengembangan</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/ekstrakurikuler" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Kelola Ekstrakurikuler</h2>
                  <p className="text-gray-600">Halaman ini sedang dalam pengembangan</p>
                </div>
              </div>
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
                <p className="text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
                <a 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kembali ke Beranda
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

