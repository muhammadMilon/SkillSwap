import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assests/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-purple-500/50">
                <img src={logo} alt="SkillSwap Logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">SkillSwap</h3>
            </div>
            <p className="text-gray-400">
              Your local platform for skill exchange. Learn, teach, and grow together.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">info@skillswap.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">123 Skill Street, Learn City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Miiiilon/" className="hover:text-blue-400 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://x.com/hiMiilon" className="hover:text-blue-400 transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://x.com/hiMiilon" className="hover:text-blue-400 transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/muhammadmilon/" className="hover:text-blue-400 transition">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 SkillSwap. All rights reserved. |
            <a href="#" className="hover:text-blue-400 ml-2">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
