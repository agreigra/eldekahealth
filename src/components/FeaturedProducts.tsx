
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Opescope Acteno Mobile C-arm",
      category: "Diagnostic Imaging",
      description: "Advanced mobile imaging system with exceptional image quality and reduced radiation.",
      image: "https://www.hitachi.com/businesses/healthcare/products_support/xray/c-arm/img/acteno_02.jpg",
      link: "/products/diagnostic-imaging/mobile-c-arm"
    },
    {
      id: 2,
      name: "Stephanix Exper'X Digital X-Ray",
      category: "Radiology Equipment",
      description: "High-performance digital radiography solution with advanced image processing capabilities.",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop",
      link: "/products/radiology/digital-x-ray"
    },
    {
      id: 3,
      name: "GE Vivid E95 Ultrasound",
      category: "Diagnostic Equipment",
      description: "Advanced cardiovascular ultrasound system with exceptional image quality and AI-powered tools.",
      image: "https://www.gehealthcare.com/-/jssmedia/images/products/ultrasound/vivid/vivid-e95/gehc-product-ultrasound-cardio-vascular-vivid-e95-features.jpg",
      link: "/products/diagnostic-equipment/ge-vivid-e95"
    },
    {
      id: 4,
      name: "Stephanix Surgical Table RT4",
      category: "Surgical Equipment",
      description: "Versatile and fully motorized operating table for all surgical disciplines.",
      image: "https://images.unsplash.com/photo-1550831106-0994fe8abcfe?q=80&w=1974&auto=format&fit=crop",
      link: "/products/surgical-equipment/operating-tables"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Equipment</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Discover our selection of high-quality medical equipment from globally renowned manufacturers, designed to enhance your diagnostic and treatment capabilities.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6 md:mt-0 md:ml-8 border-medical-600 text-medical-600 hover:bg-medical-50">
            <Link to="/products" className="flex items-center">
              View All Equipment <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} to={product.link} className="group">
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardDescription className="text-medical-600 font-medium">
                    {product.category}
                  </CardDescription>
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50 p-0 flex items-center">
                    <span>
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
