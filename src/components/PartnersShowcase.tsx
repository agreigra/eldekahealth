
const PartnersShowcase = () => {
  const partners = [
    { name: "Stryker", logo: "https://www.stryker.com/etc.clientlibs/stryker/clientlibs/clientlib-all/resources/imgs/stryker-logo/stryker-logo.svg" },
    { name: "Medtronic", logo: "https://www.medtronic.com/content/dam/medtronic-com/global/Corporate/m-logo.png" },
    { name: "Smith & Nephew", logo: "https://www.smith-nephew.com/global/assets/images/smith-and-nephew-logo.svg" },
    { name: "Siemens Healthineers", logo: "https://www.siemens-healthineers.com/presets/images/landingpage/logo.svg" },
    { name: "GE Healthcare", logo: "https://www.gehealthcare.com/-/jssmedia/gehc/global/logos/ge-healthcare-logo.jpg" },
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
