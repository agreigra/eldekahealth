
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnersShowcase from '@/components/PartnersShowcase';
import CallToAction from '@/components/CallToAction';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-medical-50 to-medical-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About EldekaHealth</h1>
              <p className="text-xl text-gray-700">
                Leading the way in medical equipment distribution across Libya, committed to enhancing healthcare standards through quality and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, EldekaHealth has grown to become a trusted name in Libya's healthcare sector. We started with a simple mission: to bridge the gap between global medical technology innovations and Libyan healthcare providers.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, we have established strong partnerships with world-renowned medical equipment manufacturers, allowing us to provide high-quality products to hospitals, clinics, and healthcare facilities across Libya.
                </p>
                <p className="text-gray-600">
                  Today, we are proud to be at the forefront of medical equipment distribution in Libya, continuously striving to enhance healthcare standards through our commitment to quality, integrity, and customer satisfaction.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="EldekaHealth team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-medical-600 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To enhance healthcare delivery in Libya by providing reliable, innovative medical equipment and superior customer service, ensuring healthcare providers have the tools they need to deliver excellent patient care.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-medical-600 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading medical equipment provider in Libya, recognized for our commitment to quality, innovation, and customer satisfaction, contributing significantly to the advancement of healthcare standards.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-medical-600 mb-4">Our Values</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-medical-600 mr-2 h-5 w-5 mt-0.5" />
                    <span>Quality and Excellence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-medical-600 mr-2 h-5 w-5 mt-0.5" />
                    <span>Integrity and Transparency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-medical-600 mr-2 h-5 w-5 mt-0.5" />
                    <span>Customer Commitment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-medical-600 mr-2 h-5 w-5 mt-0.5" />
                    <span>Continuous Innovation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-medical-600 mr-2 h-5 w-5 mt-0.5" />
                    <span>Social Responsibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals committed to bringing the best medical equipment solutions to Libya's healthcare sector.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Ahmed Al-Mansouri",
                  role: "Chief Executive Officer",
                  image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  bio: "With over 20 years of experience in healthcare management, Dr. Al-Mansouri leads our team with vision and expertise."
                },
                {
                  name: "Layla Ibrahim",
                  role: "Operations Director",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
                  bio: "Layla oversees all operational aspects, ensuring efficient delivery of medical equipment to our clients."
                },
                {
                  name: "Mohamed El-Sharif",
                  role: "Technical Director",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
                  bio: "Mohamed brings extensive technical knowledge, ensuring all our products meet the highest quality standards."
                },
                {
                  name: "Fatima Al-Zaidi",
                  role: "Customer Relations Manager",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
                  bio: "Fatima is dedicated to providing exceptional service and building strong relationships with our clients."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-medical-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Partnerships */}
        <PartnersShowcase />
        
        {/* Call to Action */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default About;
