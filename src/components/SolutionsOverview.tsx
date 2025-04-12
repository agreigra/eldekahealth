
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, HeartPulse, Microscope, Scan, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionsOverview = () => {
  const solutions = [
    {
      id: 1,
      title: "Diagnostic Imaging",
      description: "Advanced imaging systems for precise diagnosis and confident clinical decisions.",
      icon: <Scan className="w-12 h-12 text-medical-600" />,
      link: "/solutions/diagnostic-imaging"
    },
    {
      id: 2,
      title: "Patient Monitoring",
      description: "Comprehensive patient monitoring solutions for critical care environments.",
      icon: <HeartPulse className="w-12 h-12 text-medical-600" />,
      link: "/solutions/patient-monitoring"
    },
    {
      id: 3,
      title: "Laboratory Equipment",
      description: "Precision laboratory equipment for accurate and efficient diagnostics.",
      icon: <Microscope className="w-12 h-12 text-medical-600" />,
      link: "/solutions/laboratory-equipment"
    },
    {
      id: 4,
      title: "Surgical Systems",
      description: "Innovative surgical equipment for modern operating rooms and procedures.",
      icon: <Stethoscope className="w-12 h-12 text-medical-600" />,
      link: "/solutions/surgical-systems"
    },
    {
      id: 5,
      title: "Cardiology Solutions",
      description: "Specialized equipment for cardiovascular diagnosis and treatment.",
      icon: <Heart className="w-12 h-12 text-medical-600" />,
      link: "/solutions/cardiology"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Eldaka Health provides complete medical solutions across multiple specialties, partnering with globally renowned manufacturers to deliver excellence in healthcare.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div 
              key={solution.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-8">
                <div className="mb-4 flex justify-center">{solution.icon}</div>
                <h3 className="text-xl font-bold text-center mb-3">{solution.title}</h3>
                <p className="text-gray-600 text-center mb-6">{solution.description}</p>
                <div className="flex justify-center">
                  <Button asChild variant="outline" className="border-medical-600 text-medical-600 hover:bg-medical-50">
                    <Link to={solution.link} className="flex items-center">
                      Explore <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-medical-600 hover:bg-medical-700">
            <Link to="/solutions">View All Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsOverview;
