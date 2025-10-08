import { SocialIcon } from 'react-social-icons';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 rounded-full p-2 mr-3">
                <img
                  src="/assets/favicon.ico"
                  alt="Logo SMP Negeri 35"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-300">SMP NEGERI 35</h3>
                <h4 className="text-lg font-semibold">Bandar Lampung</h4>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Membangun generasi yang berprestasi, inovatif, semangat, dan aktif dalam menghadapi tantangan masa depan dengan pendidikan berkualitas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-300 mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Berita Sekolah
                </Link>
              </li>
              <li>
                <Link to="/profil/sejarah" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link to="/guru-staff" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Guru & Staff
                </Link>
              </li>
              <li>
                <Link to="/kesiswaan/prestasi" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-yellow-300 mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                <p className="text-blue-100 text-sm">
                  Jl. Drs. Warsito No.48, Kupang Kota, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35211
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <a href="tel:082181828118" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  0821-8182-8118
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <a href="mailto:smpn35bandarlampung@gmail.com" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                  smpn35bandarlampung@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-yellow-300 mb-3">Ikuti Kami</h5>
              <div className="flex space-x-3">
                <SocialIcon
                  url="https://www.instagram.com/smpn35balam"
                  fgColor="#fff"
                  bgColor="rgba(255,215,0,0.3)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  style={{ height: 36, width: 36 }}
                />
                <SocialIcon
                  url="https://www.tiktok.com/@smpn35balam"
                  fgColor="#fff"
                  bgColor="rgba(255,215,0,0.3)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  style={{ height: 36, width: 36 }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-blue-950 py-4 border-t border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm">
            <div className="mb-2 md:mb-0">
              © 2025 SMP Negeri 35 Bandar Lampung. All Rights Reserved.
            </div>
            <div>
              <a href="https://devbyte-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                Developed by DevByte
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;