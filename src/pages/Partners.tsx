
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { partners } from '@/data/partners';
import { ArrowRight } from 'lucide-react';

const Partners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader 
        title="Our Partners" 
        description="We collaborate with leading global medical equipment manufacturers to deliver the highest quality products and services."
        bgImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Strategic Partnerships That Drive Innovation</h2>
          <p className="text-gray-600">
            At Eldaka Health, we believe that partnerships are the foundation of our success. By working with industry-leading manufacturers, we ensure that our clients have access to the most advanced medical equipment and solutions available today.
          </p>
        </div>
        
        {/* Featured partners */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-center">Our Premium Manufacturing Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {partners.filter(partner => partner.featured).map((partner) => (
              <div 
                key={partner.id}
                className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32 hover:shadow-lg transition-shadow"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-16 max-w-full object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Partner categories */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-center">Partner Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Diagnostic Equipment", 
                description: "Partners specializing in advanced diagnostic technologies", 
                icon: "🩺",
                count: partners.filter(p => p.categories.includes("diagnostic")).length
              },
              { 
                title: "Surgical Systems", 
                description: "Leading manufacturers of surgical equipment and instruments", 
                icon: "🔬",
                count: partners.filter(p => p.categories.includes("surgical")).length
              },
              { 
                title: "Imaging Solutions", 
                description: "Innovative imaging technology providers", 
                icon: "📊",
                count: partners.filter(p => p.categories.includes("imaging")).length
              },
              { 
                title: "Healthcare IT", 
                description: "Partners offering healthcare software and information systems", 
                icon: "💻",
                count: partners.filter(p => p.categories.includes("healthcare-it")).length
              }
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-medical-600 font-medium">{category.count} partners</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* All partners list */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-center">All Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 flex items-center justify-center p-6">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-24 max-w-full object-contain" 
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {partner.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  {partner.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        Visit Website <ArrowRight size={16} className="ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Become a partner */}
        <div className="mt-16 bg-medical-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Are you a manufacturer of high-quality medical equipment looking to expand your market reach? Join our network of trusted partners and grow your business with us.
          </p>
          <Button className="bg-medical-600 hover:bg-medical-700">
            Partner With Us
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Partners;
