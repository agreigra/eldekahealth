
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-2/3 bg-gradient-to-r from-medical-50 to-medical-100 z-0"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block bg-medical-100 text-medical-800 px-4 py-1 rounded-full text-sm font-semibold">Trusted Medical Solutions in Libya</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-medical-600">Healthcare Technology</span> for Medical Excellence
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Eldaka Health delivers cutting-edge medical equipment, comprehensive solutions, and exceptional support to elevate healthcare standards across Libya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-medical-600 hover:bg-medical-700">
                <Link to="/solutions">
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-medical-600 text-medical-600 hover:bg-medical-50">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden rounded-xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1974&auto=format&fit=crop" 
              alt="Advanced medical equipment" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
