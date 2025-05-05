import BlogContentFields from "@/components/admin/blog-form/BlogContentFields";
import BlogFormActions from "@/components/admin/blog-form/BlogFormActions";
import BlogFormHeader from "@/components/admin/blog-form/BlogFormHeader";
import BlogMainFields from "@/components/admin/blog-form/BlogMainFields";
import {
  blogFormSchema,
  BlogFormValues,
} from "@/components/admin/blog-form/types";
import FileUpload from "@/components/ui/FileUpload";
import { Form } from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import {
  useAddBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/services/blogsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const { blogId } = useParams();
  const isEditing = !!blogId;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // RTK Query hooks
  const { data: blog, isLoading: isLoadingBlog } = useGetBlogByIdQuery(
    blogId ?? "",
    { skip: !isEditing }
  );
  const [addBlog, { isLoading: isAdding }] = useAddBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // Form setup
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      images: [],
      category: "",
      popular: false,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && blog) {
      form.reset({
        title: blog.title,
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        images: blog.images || [],
        category: blog.category || "",
        popular: blog.popular || false,
      });
    }
  }, [blog, form, isEditing]);

  const handleImagesChange = (files: File[]) => {
    setImageFiles(files);
  };

  const onSubmit = async (values: BlogFormValues) => {
    console.log(values);

    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file)); // Your files
      formData.append("data", JSON.stringify(values));
      if (isEditing && blogId) {
        await updateBlog({
          id: Number(blogId),
          body: formData,
        }).unwrap();
        toast({
          title: "Blog post updated",
          description: "The blog post has been successfully updated.",
        });
      } else {
        await addBlog({
          body: formData,
        }).unwrap();
        toast({
          title: "Blog post created",
          description: "The new blog post has been successfully created.",
        });
      }
      navigate("/admin/blogs");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          isEditing ? "update" : "create"
        } blog post. Please try again.`,
        variant: "destructive",
      });
    }
  };

  if (isEditing && isLoadingBlog) {
    return <LoadingSpinner message="Loading blog post..." />;
  }

  return (
    <div className="space-y-6">
      <BlogFormHeader isEditing={isEditing} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BlogContentFields control={form.control} />
          <BlogMainFields control={form.control} />
          {/* Add the FileUpload component */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Blog Images</h3>
            <FileUpload
              id="blog-images"
              label="Upload Images"
              description="Upload one or more images for this blog post"
              multiple={true}
              accept="image/*"
              onChange={handleImagesChange}
              value={form.getValues("images")}
            />
          </div>
          <BlogFormActions
            isEditing={isEditing}
            isLoading={isAdding || isUpdating}
          />
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
