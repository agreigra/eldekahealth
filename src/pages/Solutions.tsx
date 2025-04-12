
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Solutions = () => {
  const solutionCategories = [
    {
      id: 1,
      title: "Diagnostic Imaging",
      description: "Comprehensive range of diagnostic imaging solutions including X-ray systems, C-arms, ultrasound, and more.",
      image: "https://images.unsplash.com/photo-1516069677018-378761110b889?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Digital Radiography Systems",
        "Mobile C-Arms",
        "Ultrasound Systems",
        "CT Scanners",
        "MRI Solutions"
      ],
      link: "/solutions/diagnostic-imaging"
    },
    {
      id: 2,
      title: "Patient Monitoring",
      description: "Advanced patient monitoring systems for continuous observation and care across all clinical environments.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Multi-Parameter Monitors",
        "Telemetry Systems",
        "Vital Signs Monitors",
        "ICU Monitoring Solutions",
        "Mobile Monitoring"
      ],
      link: "/solutions/patient-monitoring"
    },
    {
      id: 3,
      title: "Surgical Systems",
      description: "Complete operating room solutions including surgical tables, lights, and specialized equipment.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Operating Tables",
        "Surgical Lights",
        "Electrosurgical Units",
        "Anesthesia Systems",
        "Surgical Instruments"
      ],
      link: "/solutions/surgical-systems"
    },
    {
      id: 4,
      title: "Laboratory Equipment",
      description: "Precision laboratory instruments for diagnostic testing and research applications.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Analyzers & Diagnostics",
        "Centrifuges",
        "Microscopes",
        "Lab Refrigeration",
        "Sterilization Equipment"
      ],
      link: "/solutions/laboratory-equipment"
    },
    {
      id: 5,
      title: "Cardiology Solutions",
      description: "Specialized equipment for cardiovascular diagnosis, monitoring, and treatment.",
      image: "https://images.unsplash.com/photo-1576671103945-77e5d022f60a?auto=format&fit=crop&q=80&w=2070",
      features: [
        "ECG Systems",
        "Cardiac Ultrasound",
        "Stress Test Systems",
        "Holter Monitors",
        "Cardiac Catheterization"
      ],
      link: "/solutions/cardiology"
    },
    {
      id: 6,
      title: "Rehabilitation Equipment",
      description: "Comprehensive rehabilitation solutions for physical therapy and recovery.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Physiotherapy Units",
        "Therapy Tables",
        "Electrotherapy Devices",
        "Rehabilitation Aids",
        "Mobility Solutions"
      ],
      link: "/solutions/rehabilitation"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-medical-50 to-medical-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Healthcare Solutions</h1>
              <p className="text-xl text-gray-700">
                Discover our comprehensive range of medical equipment and solutions designed to enhance patient care and clinical outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {solutionCategories.map((category, index) => (
                <div 
                  key={category.id} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                    <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-5 h-5 rounded-full bg-medical-100 flex items-center justify-center">
                              <span className="text-medical-600 text-xs">✓</span>
                            </div>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-medical-600 hover:bg-medical-700">
                      <Link to={category.link} className="flex items-center">
                        Explore {category.title} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className={`rounded-lg overflow-hidden shadow-xl ${
                    index % 2 !== 0 ? 'lg:col-start-1' : ''
                  }`}>
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
