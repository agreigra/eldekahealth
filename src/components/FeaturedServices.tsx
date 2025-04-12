
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, FileText, HeartPulse, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedServices = () => {
  const services = [
    {
      id: 1,
      title: "Medical Equipment Consulting",
      description: "Expert guidance on selecting the right medical equipment for your healthcare facility.",
      icon: <FileText className="w-10 h-10 text-medical-600" />,
      link: "/services/consulting"
    },
    {
      id: 2,
      title: "Installation & Setup",
      description: "Professional installation and configuration of medical equipment by certified technicians.",
      icon: <Settings className="w-10 h-10 text-medical-600" />,
      link: "/services/installation"
    },
    {
      id: 3,
      title: "Maintenance & Repair",
      description: "Comprehensive after-sales service to ensure your equipment operates at peak performance.",
      icon: <HeartPulse className="w-10 h-10 text-medical-600" />,
      link: "/services/after-sales"
    },
    {
      id: 4,
      title: "Technical Support",
      description: "24/7 technical assistance and troubleshooting for all your medical equipment needs.",
      icon: <Phone className="w-10 h-10 text-medical-600" />,
      link: "/services/technical-support"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive support for all your medical equipment needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={service.link}
                className="text-medical-600 font-medium flex items-center hover:text-medical-700"
              >
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-medical-600 hover:bg-medical-700">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
