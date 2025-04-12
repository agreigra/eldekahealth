
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
import { useGetBlogByIdQuery, useAddBlogMutation, useUpdateBlogMutation } from '@/services/blogsApi';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  image: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  popular: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const BlogForm = () => {
  const { blogId } = useParams();
  const isEditing = !!blogId;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // RTK Query hooks
  const { data: blog, isLoading: isLoadingBlog } = useGetBlogByIdQuery(
    blogId ?? '', 
    { skip: !isEditing }
  );
  const [addBlog, { isLoading: isAdding }] = useAddBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      popular: false
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && blog) {
      form.reset({
        title: blog.title,
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        image: blog.image || '',
        category: blog.category || '',
        popular: blog.popular || false,
      });
    }
  }, [blog, form, isEditing]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && blogId) {
        await updateBlog({
          id: blogId,
          ...values,
          date: blog?.date || new Date().toLocaleDateString(),
        }).unwrap();
        toast({
          title: "Blog post updated",
          description: "The blog post has been successfully updated.",
        });
      } else {
        await addBlog({
          ...values,
          date: new Date().toLocaleDateString(),
        }).unwrap();
        toast({
          title: "Blog post created",
          description: "The new blog post has been successfully created.",
        });
      }
      navigate('/admin/blogs');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} blog post. Please try again.`,
        variant: "destructive",
      });
    }
  };

  if (isEditing && isLoadingBlog) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
        <span className="ml-2">Loading blog post...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <p className="text-muted-foreground mt-2">
          {isEditing ? 'Update the blog post details below.' : 'Fill in the details to create a new blog post.'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Medical Technology" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>Enter a direct URL to the blog post featured image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of the blog post..." 
                    className="min-h-20"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>A short summary displayed on the blog listing page</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter full blog post content..." 
                    className="min-h-64"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="popular"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mark as Popular</FormLabel>
                  <FormDescription>
                    Highlight this post as popular or trending
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/blogs')}
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
              {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
