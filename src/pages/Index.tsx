
import Hero from '@/components/Hero';
import PartnersShowcase from '@/components/PartnersShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturedServices from '@/components/FeaturedServices';
import BlogPreview from '@/components/BlogPreview';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionsOverview from '@/components/SolutionsOverview';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PartnersShowcase />
        <SolutionsOverview />
        <FeaturedProducts />
        <FeaturedServices />
        <BlogPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
