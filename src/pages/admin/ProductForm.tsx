import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/services/productsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FileUpload from "@/components/ui/FileUpload";

// Product categories
const PRODUCT_CATEGORIES = [
  { value: "diagnostic", label: "Diagnostic Equipment" },
  { value: "imaging", label: "Imaging Solutions" },
  { value: "surgical", label: "Surgical Equipment" },
  { value: "dental", label: "Dental Equipment" },
  { value: "patient-monitoring", label: "Patient Monitoring" },
  { value: "lab-equipment", label: "Laboratory Equipment" },
  { value: "emergency", label: "Emergency Equipment" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  new: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const { productId } = useParams();
  const isEditing = !!productId;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mainImageFile, setMainImageFile] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  // RTK Query hooks
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    productId ?? "",
    { skip: !isEditing }
  );
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      gallery: [],
      category: "",
      featured: false,
      new: false,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price?.toString() || "",
        image: product.image || "",
        gallery: product.gallery || [],
        category: product.categoryId || "",
        featured: product.featured || false,
        new: product.new || false,
      });
    }
  }, [product, form, isEditing]);

  const handleMainImageChange = (files: File[]) => {
    setMainImageFile(files);
  };

  const handleGalleryImagesChange = (files: File[]) => {
    setGalleryFiles(files);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      // Find the category label based on the selected category id
      const categoryObject = PRODUCT_CATEGORIES.find(
        (cat) => cat.value === values.category
      );
      const categoryName = categoryObject
        ? categoryObject.label
        : values.category;

      // In a real app, you would upload the files to storage and get back URLs
      // For this demo, we'll simulate by using sample image URLs
      const mainImage =
        mainImageFile.length > 0
          ? "https://images.unsplash.com/photo-1516069677018-378ddb5ea25f?w=800&auto=format&fit=crop"
          : values.image;

      const galleryImages =
        galleryFiles.length > 0
          ? Array(galleryFiles.length).fill(
              "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop"
            )
          : values.gallery;

      if (isEditing && productId) {
        await updateProduct({
          id: productId,
          ...values,
          image: mainImage,
          gallery: galleryImages,
          price: parseFloat(values.price),
          categoryId: values.category,
          category: categoryName,
        }).unwrap();
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
        });
      } else {
        await addProduct({
          ...values,
          image: mainImage,
          gallery: galleryImages,
          price: parseFloat(values.price),
          categoryId: values.category,
          category: categoryName,
        }).unwrap();
        toast({
          title: "Product created",
          description: "The new product has been successfully created.",
        });
      }
      navigate("/admin/products");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          isEditing ? "update" : "create"
        } product. Please try again.`,
        variant: "destructive",
      });
    }
  };

  if (isEditing && isLoadingProduct) {
    return <LoadingSpinner message="Loading product..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Product" : "Create New Product"}
        </h2>
        <p className="text-muted-foreground mt-2">
          {isEditing
            ? "Update the product details below."
            : "Fill in the details to create a new product."}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a direct URL to the product image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed product description..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<div className="space-y-4">
             <h3 className="text-lg font-medium">Product Images</h3>
             
             <div>
               <h4 className="text-sm font-medium mb-2">Main Product Image</h4>
               <FileUpload
                 id="main-image"
                 label="Upload Main Image"
                 description="This will be the primary image shown for this product"
                 multiple={false}
                 onChange={handleMainImageChange}
                 value={form.getValues('image') ? [form.getValues('image')] : []}
               />
             </div>
             
             <div>
               <h4 className="text-sm font-medium mb-2">Product Gallery</h4>
               <FileUpload
                 id="gallery-images"
                 label="Upload Gallery Images"
                 description="Add additional images to showcase your product"
                 multiple={true}
                 maxFiles={5}
                 onChange={handleGalleryImagesChange}
                 value={form.getValues('gallery') || []}
               />
             </div>
           </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Product</FormLabel>
                    <FormDescription>
                      Display this product as featured on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>New Product</FormLabel>
                    <FormDescription>
                      Mark this product as newly added
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-medical-600 hover:bg-medical-700"
              disabled={isAdding || isUpdating}
            >
              {(isAdding || isUpdating) && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
              )}
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
