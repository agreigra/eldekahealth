
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Advancements in Orthopedic Surgery Equipment",
      excerpt: "Explore the latest innovations in orthopedic surgical tools and how they're improving patient outcomes.",
      date: "April 2, 2023",
      author: "Dr. Mohammed Ali",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      slug: "advancements-in-orthopedic-surgery-equipment"
    },
    {
      id: 2,
      title: "Choosing the Right Diagnostic Equipment for Your Practice",
      excerpt: "A comprehensive guide to selecting diagnostic equipment that meets your healthcare facility's needs.",
      date: "March 15, 2023",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      slug: "choosing-right-diagnostic-equipment"
    },
    {
      id: 3,
      title: "Maintaining Medical Equipment: Best Practices",
      excerpt: "Learn how proper maintenance extends the life of your medical equipment and ensures patient safety.",
      date: "February 28, 2023",
      author: "Ahmed Benali",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      slug: "medical-equipment-maintenance-best-practices"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Insights, updates, and expertise from our healthcare professionals
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6 md:mt-0 md:ml-8 border-medical-600 text-medical-600 hover:bg-medical-50">
            <Link to="/blog" className="flex items-center">
              View All Articles <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-bold mb-2 hover:text-medical-600 transition-colors">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-medical-600 font-medium flex items-center hover:text-medical-700"
                >
                  Read more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
