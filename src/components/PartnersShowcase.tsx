
const PartnersShowcase = () => {
  const partners = [
    { name: "Stryker", logo: "assets/images/stryker.webp" },
    { name: "Medtronic", logo: "assets/images/medtronic.png" },
    { name: "Smith & Nephew", logo: "assets/images/smithNephew.webp" },
    { name: "Siemens Healthineers", logo: "assets/images/siemens.jpg" },
    { name: "GE Healthcare", logo: "/assets/images/gehealthcare.png" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Trusted Partners</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading global medical equipment manufacturers to ensure the highest quality products.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-24 w-full hover:shadow-lg transition-shadow">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="max-h-12 max-w-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersShowcase;
