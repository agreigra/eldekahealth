
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-medical-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Looking for Specialized Medical Equipment?</h2>
            <p className="text-lg text-medical-50">
              Our team of experts is ready to help you find the perfect healthcare technology solutions for your facility. Contact us today for personalized assistance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-medical-600 hover:bg-gray-100">
              <Link to="/contact" className="flex items-center">
                <PhoneCall className="mr-2 h-5 w-5" />
                Call Us
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-medical-700">
              <Link to="/contact" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
