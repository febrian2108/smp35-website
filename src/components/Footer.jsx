import { Facebook, Instagram, Youtube, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-yellow-400 to-yellow-500">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          {/* School Logo and Name */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-3 mr-4">
              <img 
                src="/assets/Logo-Smp-Negeri-35-Bdl.png" 
                alt="Logo SMP Negeri 35" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-blue-600">SMP NEGERI 35</h3>
              <h4 className="text-xl font-bold text-blue-600">Bandar Lampung</h4>
            </div>
          </div>

          {/* School Description */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-white text-sm leading-relaxed">
              SMP Negeri 35 Bandar Lampung adalah salah satu sekolah menengah 
              pertama yang ada di Kota Bandar Lampung, Provisi Lampung.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="mb-8">
            <h4 className="text-white text-lg font-semibold mb-4">Temukan Kami</h4>
            <div className="flex justify-center space-x-4">
              <a 
                href="#" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
                aria-label="TikTok"
              >
                <Music className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-blue-500 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
            <div className="mb-2 md:mb-0">
              © 2025. SMP Negeri 35 Bandar Lampung. All Rights Reserved.
            </div>
            <div>
              Developed by DevByte
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

