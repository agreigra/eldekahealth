
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import { blogPosts } from '@/data/blogPosts';
import { useGetBlogsQuery } from '@/services/blogsApi';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'medical-equipment', name: 'Medical Equipment' },
    { id: 'healthcare-technology', name: 'Healthcare Technology' },
    { id: 'industry-news', name: 'Industry News' },
    { id: 'case-studies', name: 'Case Studies' }
  ];

    const { data: blogPosts = [], isLoading } = useGetBlogsQuery();
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader 
        title="Blog & Resources" 
        description="Stay updated with the latest news, insights and developments in medical equipment and healthcare technology."
        bgImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Search for mobile */}
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="pl-10 bg-white border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Blog posts grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User size={14} className="mr-1" />
                        <span>{post.author.firstName + " "+ post.author.lastName}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                      <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50 p-0 flex items-center">
                        <Link to={`/blog/${post.id}`}>
                          Read More <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-700">No articles found</h3>
                <p className="text-gray-500 mt-2">Try changing your search or category</p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-1">
                  <Button variant="outline" className="border-gray-300 w-10 h-10 p-0">1</Button>
                  <Button variant="outline" className="border-gray-300 w-10 h-10 p-0">2</Button>
                  <Button variant="outline" className="border-gray-300 w-10 h-10 p-0">3</Button>
                  <Button variant="outline" className="border-gray-300 w-10 h-10 p-0">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="pl-10 bg-white border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className={`w-full text-left px-2 py-1.5 rounded-md ${activeCategory === category.id ? 'bg-medical-50 text-medical-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {blogPosts.filter(post => post.popular).slice(0, 3).map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-medical-600 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
