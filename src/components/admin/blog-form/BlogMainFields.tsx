
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Control } from 'react-hook-form';
import { BlogFormValues } from './types';

// Blog categories
export const BLOG_CATEGORIES = [
  { value: 'healthcare-technology', label: 'Healthcare Technology' },
  { value: 'medical-equipment', label: 'Medical Equipment' },
  { value: 'industry-news', label: 'Industry News' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'research', label: 'Research' },
  { value: 'company-news', label: 'Company News' }
];

interface BlogMainFieldsProps {
  control: Control<BlogFormValues>;
}

const BlogMainFields: React.FC<BlogMainFieldsProps> = ({ control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* <FormField
        control={control}
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
        control={control}
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
                {BLOG_CATEGORIES.map((category) => (
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

      {/* <FormField
        control={control}
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
      /> */}
    </div>
  );
};

export default BlogMainFields;