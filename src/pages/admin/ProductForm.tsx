
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation } from '@/services/productsApi';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number"
  }),
  image: z.string().optional(),
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
  
  // RTK Query hooks
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    productId ?? '', 
    { skip: !isEditing }
  );
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      featured: false,
      new: false
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price?.toString() || '',
        image: product.image || '',
        category: product.category || '',
        featured: product.featured || false,
        new: product.new || false,
      });
    }
  }, [product, form, isEditing]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && productId) {
        await updateProduct({
          id: productId,
          ...values,
          price: parseFloat(values.price),
        }).unwrap();
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
        });
      } else {
        await addProduct({
          ...values,
          price: parseFloat(values.price),
        }).unwrap();
        toast({
          title: "Product created",
          description: "The new product has been successfully created.",
        });
      }
      navigate('/admin/products');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`,
        variant: "destructive",
      });
    }
  };

  if (isEditing && isLoadingProduct) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
        <span className="ml-2">Loading product...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditing ? 'Edit Product' : 'Create New Product'}
        </h2>
        <p className="text-muted-foreground mt-2">
          {isEditing ? 'Update the product details below.' : 'Fill in the details to create a new product.'}
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
                  <FormControl>
                    <Input placeholder="e.g., Surgical Equipment" {...field} />
                  </FormControl>
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
                    <Input type="number" placeholder="0.00" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>Enter a direct URL to the product image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              onClick={() => navigate('/admin/products')}
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
              {isEditing ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
