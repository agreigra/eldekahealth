
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    featured?: boolean;
    new?: boolean;
    price?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden h-48">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-medical-600">Featured</Badge>
          )}
          {product.new && (
            <Badge variant="outline" className="absolute top-2 left-2 bg-white">New</Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardDescription className="text-medical-600 font-medium">
            {product.category}
          </CardDescription>
          <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          {product.price && (
            <p className="text-medical-700 font-medium mt-2">{product.price}</p>
          )}
        </CardContent>
        <CardFooter className="mt-auto pt-4">
          <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50 p-0 flex items-center">
            <span>
              View Details <ArrowRight size={16} className="ml-2" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
