
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Solutions from "./pages/Solutions";
import Products from "./pages/Products";
import ProductSingle from "./pages/ProductSingle";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Partners from "./pages/Partners";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminBlogs from "./pages/AdminBlogs";
import ProductForm from "./pages/admin/ProductForm";
import BlogForm from "./pages/admin/BlogForm";
import Navbar from "./components/Navbar";
import AdminUsers from "./pages/AdminUsers";
import UserForm from "./pages/admin/UserForm";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductSingle />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogSingle />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/login" element={<><Navbar /><Login /></>} />
               <Route path="/register" element={<><Navbar /><Register /></>} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:productId" element={<ProductForm />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="blogs/new" element={<BlogForm />} />
                <Route path="blogs/:blogId" element={<BlogForm />} />
                <Route path="users" element={<AdminUsers />} />
                 <Route path="users/new" element={<UserForm />} />
                 <Route path="users/:userId" element={<UserForm />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
