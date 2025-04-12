
export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  featured: boolean;
  categories: string[];
  website?: string;
}

export const partners: Partner[] = [
  {
    id: "stryker",
    name: "Stryker",
    description: "Global leader in medical technology offering innovative products and services in Orthopaedics, Medical and Surgical, and Neurotechnology and Spine.",
    logo: "https://www.stryker.com/etc.clientlibs/stryker/clientlibs/clientlib-all/resources/imgs/stryker-logo/stryker-logo.svg",
    featured: true,
    categories: ["surgical", "orthopedic"],
    website: "https://www.stryker.com"
  },
  {
    id: "medtronic",
    name: "Medtronic",
    description: "Leading global healthcare technology company offering therapies and solutions for people with chronic pain, movement disorders, and other health conditions.",
    logo: "https://www.medtronic.com/content/dam/medtronic-com/global/Corporate/m-logo.png",
    featured: true,
    categories: ["cardiac", "diabetes", "surgical"],
    website: "https://www.medtronic.com"
  },
  {
    id: "smith-nephew",
    name: "Smith & Nephew",
    description: "Global medical technology business dedicated to helping healthcare professionals improve people's lives through advanced medical devices and equipment.",
    logo: "https://www.smith-nephew.com/global/assets/images/smith-and-nephew-logo.svg",
    featured: true,
    categories: ["orthopedic", "wound-management", "sports-medicine"],
    website: "https://www.smith-nephew.com"
  },
  {
    id: "siemens-healthineers",
    name: "Siemens Healthineers",
    description: "Provider of medical imaging, laboratory diagnostics, and healthcare IT solutions for healthcare providers worldwide.",
    logo: "https://www.siemens-healthineers.com/presets/images/landingpage/logo.svg",
    featured: true,
    categories: ["diagnostic", "imaging", "laboratory"],
    website: "https://www.siemens-healthineers.com"
  },
  {
    id: "ge-healthcare",
    name: "GE Healthcare",
    description: "Leading provider of medical imaging, monitoring, biomanufacturing, and cell therapy technologies, enabling precision health in diagnostics, therapeutics, and monitoring.",
    logo: "https://www.gehealthcare.com/-/jssmedia/gehc/global/logos/ge-healthcare-logo.jpg",
    featured: true,
    categories: ["imaging", "diagnostic", "monitoring"],
    website: "https://www.gehealthcare.com"
  },
  {
    id: "philips-healthcare",
    name: "Philips Healthcare",
    description: "Health technology company focused on improving people's health through meaningful innovation across the health continuum.",
    logo: "https://www.philips.com/c-dam/corporate/philips-logo.svg",
    featured: false,
    categories: ["imaging", "patient-monitoring", "healthcare-it"],
    website: "https://www.philips.com/healthcare"
  },
  {
    id: "karl-storz",
    name: "KARL STORZ",
    description: "Manufacturer of endoscopes, medical instruments, and devices, providing solutions for minimally invasive procedures.",
    logo: "https://www.karlstorz.com/images/stoerfix/logo.svg",
    featured: false,
    categories: ["endoscopy", "surgical"],
    website: "https://www.karlstorz.com"
  },
  {
    id: "canon-medical",
    name: "Canon Medical Systems",
    description: "Provider of integrated diagnostic imaging solutions, including CT, MRI, ultrasound, X-ray systems, and healthcare IT solutions.",
    logo: "https://global.medical.canon/common/img/logo.svg",
    featured: false,
    categories: ["diagnostic", "imaging"],
    website: "https://global.medical.canon"
  },
  {
    id: "zimmer-biomet",
    name: "Zimmer Biomet",
    description: "Global leader in musculoskeletal healthcare, designing, manufacturing, and marketing orthopedic products.",
    logo: "https://www.zimmerbiomet.com/content/dam/zimmer-biomet-us/CORPORATE/logo_ZB.png",
    featured: false,
    categories: ["orthopedic", "dental", "spine"],
    website: "https://www.zimmerbiomet.com"
  },
  {
    id: "hill-rom",
    name: "Hillrom",
    description: "Provider of medical technologies for the healthcare industry, focusing on patient care solutions.",
    logo: "https://www.hillrom.com/-/media/images/hillrom-templates/hillrom-logo.svg",
    featured: false,
    categories: ["patient-care", "monitoring"],
    website: "https://www.hillrom.com"
  },
  {
    id: "drager",
    name: "Dräger",
    description: "An international leader in medical and safety technology, developing innovative equipment and solutions.",
    logo: "https://www.draeger.com/static/images/logo.svg",
    featured: false,
    categories: ["anesthesia", "ventilation", "monitoring"],
    website: "https://www.draeger.com"
  },
  {
    id: "olympus-medical",
    name: "Olympus Medical",
    description: "Leading manufacturer of optical and digital precision technology, providing innovative medical technology solutions.",
    logo: "https://www.olympus-global.com/assets/img/common/logo.svg",
    featured: false,
    categories: ["endoscopy", "surgical", "imaging"],
    website: "https://www.olympus-global.com"
  }
];
