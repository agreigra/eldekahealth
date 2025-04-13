
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGetCurrentUserQuery, useLogoutMutation } from '@/services/authenticationApi';
import Navbar from '@/components/Navbar';

const Admin = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const skipQuery = !token;

  const { data: user } = useGetCurrentUserQuery(undefined, {skip:skipQuery}); 
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const getCurrentTab = () => {
    if (location.pathname.includes('/admin/products')) return 'products';
    if (location.pathname.includes('/admin/blogs')) return 'blogs';
    if (location.pathname.includes('/admin/users')) return 'users';
    return 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar />
      <header className="bg-white shadow border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-medical-600">Admin Dashboard</h1>
            {user && (
              <div className="ml-4 text-sm text-gray-600">
                Logged in as <span className="font-medium">{user.email}</span> ({user.role})
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-gray-700" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={getCurrentTab()} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="dashboard" 
              onClick={() => navigate('/admin')}
              className={location.pathname === '/admin' ? 'data-[state=active]:bg-medical-600 data-[state=active]:text-white' : ''}
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              onClick={() => navigate('/admin/products')}
              className={location.pathname.includes('/admin/products') ? 'data-[state=active]:bg-medical-600 data-[state=active]:text-white' : ''}
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              onClick={() => navigate('/admin/blogs')}
              className={location.pathname.includes('/admin/blogs') ? 'data-[state=active]:bg-medical-600 data-[state=active]:text-white' : ''}
            >
              Blog Posts
            </TabsTrigger>
            <TabsTrigger 
               value="users" 
               onClick={() => navigate('/admin/users')}
               className={location.pathname.includes('/admin/users') ? 'data-[state=active]:bg-medical-600 data-[state=active]:text-white' : ''}
             >
               Users
             </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="bg-white shadow rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
