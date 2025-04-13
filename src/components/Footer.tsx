
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">EldekaHealth</h3>
            <p className="text-gray-300 mb-4">Leading Libyan company specialized in importing and distributing high-quality medical equipment and consumables.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-medical-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-medical-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-medical-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-medical-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6">Product Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/products/orthopedic-devices" className="text-gray-300 hover:text-white transition-colors">Orthopedic Devices</Link></li>
              <li><Link to="/products/surgical-instruments" className="text-gray-300 hover:text-white transition-colors">Surgical Instruments</Link></li>
              <li><Link to="/products/diagnostic-equipment" className="text-gray-300 hover:text-white transition-colors">Diagnostic Equipment</Link></li>
              <li><Link to="/products/medical-consumables" className="text-gray-300 hover:text-white transition-colors">Medical Consumables</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-medical-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Medical Street, Tripoli, Libya</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-medical-400 flex-shrink-0" />
                <span className="text-gray-300">+218 91 234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-medical-400 flex-shrink-0" />
                <a href="mailto:info@eldakahealth.com" className="text-gray-300 hover:text-white transition-colors">info@eldakahealth.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest products and healthcare news</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 focus:outline-none rounded-l"
              />
              <button type="submit" className="bg-medical-600 px-4 py-2 rounded-r hover:bg-medical-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EldekaHealth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
