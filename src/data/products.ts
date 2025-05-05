
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  longDescription?: string;
  features?: string[];
  specifications?: Record<string, string>;
  image: string;
  gallery?: string[];
  featured?: boolean;
  new?: boolean;
  price?: number;
  documents?: {
    name: string;
    link: string;
  }[];
  related?: string[];
}

export const medicalProducts: Product[] = [
  {
    id: "digital-x-ray-discovery",
    name: "Digital X-Ray Discovery XR656",
    category: "Diagnostic Imaging",
    categoryId: "diagnostic",
    description: "Advanced digital X-ray system with high image quality and reduced radiation dose.",
    longDescription: "The Discovery XR656 is a premium digital radiography system designed for hospitals and imaging centers requiring exceptional image quality with optimized dose efficiency. It features intelligent automation to streamline workflow and improve patient throughput.",
    features: [
      "Dynamic flat-panel detector with high DQE",
      "Advanced image processing algorithms",
      "Automated positioning and exposure control",
      "Dose reduction technology",
      "Streamlined workflow integration"
    ],
    specifications: {
      "Detector Size": "43cm x 43cm",
      "Pixel Size": "150μm",
      "Image Resolution": "2800 x 2800 pixels",
      "Generator Power": "65kW",
      "kV Range": "40-150kV",
      "Weight Capacity": "250kg"
    },
    image: "https://www.hitachi.com/businesses/healthcare/products_support/xray/c-arm/img/acteno_02.jpg",
    gallery: [
      "https://www.hitachi.com/businesses/healthcare/products_support/xray/c-arm/img/acteno_02.jpg",
      "https://images.unsplash.com/photo-1516069677018-378ddb5ea25f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop"
    ],
    featured: true,
    documents: [
      { name: "Technical Specification", link: "#" },
      { name: "User Manual", link: "#" },
      { name: "Installation Guide", link: "#" }
    ],
    related: ["mobile-c-arm-vision", "ultrasound-expert-v9"]
  },
  {
    id: "mobile-c-arm-vision",
    name: "Mobile C-Arm Opescope Vision",
    category: "Surgical Imaging",
    categoryId: "surgical",
    description: "High-performance mobile C-arm for surgical procedures with advanced image quality.",
    longDescription: "The Opescope Vision mobile C-arm delivers exceptional fluoroscopic imaging with intuitive controls and ease of positioning for surgical applications. Its compact design and advanced image processing provide surgeons with clear, detailed visualization.",
    features: [
      "Flat-panel detector technology",
      "Pulsed fluoroscopy for dose reduction",
      "Advanced collimation capabilities",
      "Touchscreen interface",
      "Compact, easy-to-position design"
    ],
    specifications: {
      "Detector Size": "31cm x 31cm",
      "Image Matrix": "1024 x 1024",
      "kV Range": "40-125kV",
      "mA Range": "0.2-20mA",
      "Rotation Range": "±190°"
    },
    image: "https://www.hitachi.com/businesses/healthcare/products_support/xray/c-arm/img/acteno_02.jpg",
    gallery: [
      "https://www.hitachi.com/businesses/healthcare/products_support/xray/c-arm/img/acteno_02.jpg",
      "https://images.unsplash.com/photo-1516069677018-378ddb5ea25f?w=800&auto=format&fit=crop"
    ],
    new: true
  },
  {
    id: "ultrasound-expert-v9",
    name: "Ultrasound Expert V9",
    category: "Diagnostic Equipment",
    categoryId: "diagnostic",
    description: "Premium color Doppler ultrasound system with advanced imaging capabilities.",
    longDescription: "The Expert V9 ultrasound system delivers exceptional image quality with advanced color Doppler capabilities for comprehensive diagnostic applications across multiple specialties.",
    features: [
      "Advanced B-mode imaging",
      "High-sensitivity color Doppler",
      "Tissue Harmonic Imaging",
      "Strain elastography",
      "Panoramic imaging"
    ],
    image: "https://www.gehealthcare.com/-/jssmedia/images/products/ultrasound/vivid/vivid-e95/gehc-product-ultrasound-cardio-vascular-vivid-e95-features.jpg",
    gallery: [
      "https://www.gehealthcare.com/-/jssmedia/images/products/ultrasound/vivid/vivid-e95/gehc-product-ultrasound-cardio-vascular-vivid-e95-features.jpg",
      "https://images.unsplash.com/photo-1578343552605-8f6bf4f728f3?w=800&auto=format&fit=crop"
    ],
    featured: true
  },
  {
    id: "patient-monitor-guardian",
    name: "Guardian X3 Patient Monitor",
    category: "Patient Monitoring",
    categoryId: "diagnostic",
    description: "Comprehensive patient monitor with multi-parameter capabilities and connectivity features.",
    image: "https://images.unsplash.com/photo-1578343552605-8f6bf4f728f3?w=800&auto=format&fit=crop"
  },
  {
    id: "surgical-table-universal",
    name: "Universal RT4 Surgical Table",
    category: "Surgical Equipment",
    categoryId: "surgical",
    description: "Versatile and fully motorized operating table for all surgical disciplines.",
    image: "https://images.unsplash.com/photo-1550831106-0994fe8abcfe?w=800&auto=format&fit=crop"
  },
  {
    id: "dental-unit-complete",
    name: "Complete Dental Treatment Unit",
    category: "Dental Equipment",
    categoryId: "dental",
    description: "Integrated dental treatment center with patient chair, delivery system, and lighting.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop",
    new: true
  },
  {
    id: "surgical-light-system",
    name: "HD Surgical Light System",
    category: "Surgical Equipment",
    categoryId: "surgical",
    description: "Advanced LED surgical lighting with HD camera integration and precise positioning.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop"
  },
  {
    id: "mri-magnetom-advance",
    name: "Magnetom Advance 1.5T MRI",
    category: "Imaging Solutions",
    categoryId: "imaging",
    description: "High-performance 1.5T MRI system with advanced imaging capabilities and patient comfort features.",
    image: "https://images.unsplash.com/photo-1516069677018-378ddb5ea25f?w=800&auto=format&fit=crop",
    featured: true
  }
];
