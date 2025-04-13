import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenBox, Package, Settings, Users } from "lucide-react";
import { medicalProducts } from "@/data/products";
import { blogPosts } from "@/data/blogPosts";
import { useGetUsersQuery } from "@/services/userApi";

const AdminDashboard = () => {
  const { data: users } = useGetUsersQuery();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-muted-foreground">
        Here you can manage your products, blog posts, and users. Use the tabs
        above to navigate between different sections.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total products in the catalog
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-medical-600 hover:bg-medical-700"
            >
              <Link to="/admin/products">Manage Products</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <PenBox className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Published blog articles
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-medical-600 hover:bg-medical-700"
            >
              <Link to="/admin/blogs">Manage Blog Posts</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-medical-600 hover:bg-medical-700"
            >
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
