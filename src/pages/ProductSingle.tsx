
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { medicalProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductSingle = () => {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const product = medicalProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = product.related 
    ? medicalProducts.filter(p => product.related?.includes(p.id)) 
    : medicalProducts.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-medical-600">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-medical-600">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-medical-600">{product.category}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-800">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-80">
              <img 
                src={product.gallery?.[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4"
              />
            </div>
            
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-auto pb-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-medical-600' : 'border-gray-200'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-medical-600 font-medium mb-4">{product.category}</p>
            
            <p className="text-gray-700 mb-6">
              {product.longDescription || product.description}
            </p>
            
            {product.price && (
              <p className="text-xl font-semibold text-medical-700 mb-6">
                {product.price}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button className="bg-medical-600 hover:bg-medical-700">
                Request a Quote
              </Button>
              <Button variant="outline" className="border-medical-600 text-medical-600 hover:bg-medical-50">
                Download Brochure
              </Button>
            </div>
            
            {product.features && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-medical-500 mt-2 mr-3"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Product tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="pt-6">
            {product.specifications ? (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 border-b border-gray-200 font-medium">{key}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No specifications available for this product.</p>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="pt-6">
            {product.documents && product.documents.length > 0 ? (
              <div className="space-y-4">
                {product.documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <span className="font-medium">{doc.name}</span>
                    <Button asChild variant="ghost" size="sm">
                      <a href={doc.link} target="_blank" rel="noopener noreferrer">
                        <Download size={16} className="mr-2" /> Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents available for this product.</p>
            )}
          </TabsContent>
          
          <TabsContent value="support" className="pt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
              <p className="mb-4">For technical assistance with this product, please contact our support team:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="font-medium w-24">Phone:</span>
                  <span>+1-800-555-0123</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium w-24">Email:</span>
                  <span>support@eldakahealth.com</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium w-24">Hours:</span>
                  <span>Monday - Friday, 8:00 AM - 6:00 PM EST</span>
                </li>
              </ul>
              
              <Button className="bg-medical-600 hover:bg-medical-700">
                Contact Support
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductSingle;
