
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  bgImage?: string;
}

const PageHeader = ({ title, description, bgImage }: PageHeaderProps) => {
  return (
    <div className="relative">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
      )}
      
      <div className={`relative z-10 container mx-auto px-4 py-16 md:py-24 ${bgImage ? 'text-white' : 'text-gray-900'}`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
          {title}
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
