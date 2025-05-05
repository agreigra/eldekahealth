import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";
import { useGetBlogByIdQuery } from "@/services/blogsApi";
import { skipToken } from "@tanstack/react-query";

const BlogSingle = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetBlogByIdQuery(postId);

  // const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="w-full">
        {/* Featured image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={
              post.images.length > 0
                ? "http://localhost:8081/api/" + post.images[0]
                : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
            }
            // src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container mx-auto">
              <span className="inline-block px-3 py-1 bg-medical-600 text-white text-sm font-medium rounded-md mb-3">
                {post.category
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
              <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
                {post.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar size={14} className="mr-1" />
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <User size={14} className="mr-1" />
                <span>
                  {post.author.firstName + " " + post.author.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              {/* Article content */}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                  <Tag size={16} className="text-gray-500" />
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <span className="font-medium text-gray-700">
                  Share this article:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <Facebook size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <Twitter size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <Linkedin size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Author bio */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${post.author.firstName.replace(
                      " ",
                      "+"
                    )}&background=0D8A9E&color=fff`}
                    alt={post.author.firstName + " " + post.author.lastName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {post.author.firstName + " " + post.author.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Medical Technology Specialist
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                A healthcare technology expert with over 15 years of experience
                in the medical equipment industry. Specializes in emerging
                technologies and their application in clinical settings.
              </p>
            </div>

            {/* Back to blog link */}
            <Button asChild variant="outline" className="mb-8">
              <Link to="/blog" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
              </Link>
            </Button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related posts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-medical-600 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {relatedPost.date}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No related articles found.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/blog?category=medical-equipment"
                      className="text-gray-700 hover:text-medical-600 block py-1"
                    >
                      Medical Equipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog?category=healthcare-technology"
                      className="text-gray-700 hover:text-medical-600 block py-1"
                    >
                      Healthcare Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog?category=industry-news"
                      className="text-gray-700 hover:text-medical-600 block py-1"
                    >
                      Industry News
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog?category=case-studies"
                      className="text-gray-700 hover:text-medical-600 block py-1"
                    >
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Newsletter signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Subscribe to Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with our latest articles, industry news and
                  product information.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                    required
                  />
                  <Button className="w-full bg-medical-600 hover:bg-medical-700">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogSingle;
