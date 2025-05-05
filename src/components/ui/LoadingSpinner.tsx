import React from 'react';
 
 interface LoadingSpinnerProps {
   message?: string;
 }
 
 const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
   return (
     <div className="flex justify-center items-center py-8">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
       <span className="ml-2">{message}</span>
     </div>
   );
 };
 
 export default LoadingSpinner;