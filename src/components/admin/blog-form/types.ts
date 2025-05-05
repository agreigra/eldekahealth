import { z } from 'zod';
 
const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

 // Blog form schema
 export const blogFormSchema = z.object({
   title: z.string().min(5, "Title must be at least 5 characters"),
   excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
   content: z.string().min(50, "Content must be at least 50 characters"),
   images: z
   .any()
   .refine(
     (files: FileList | File[]) => {
       if (!files || (files instanceof FileList && files.length === 0)) return true;
       const filesArray = Array.from(files);
       return filesArray.every((file) => file.size <= FILE_SIZE_LIMIT);
     },
     { message: 'Un ou plusieurs fichiers sont trop lourds (max 5MB)' }
   )
   .refine(
     (files: FileList | File[]) => {
       if (!files || (files instanceof FileList && files.length === 0)) return true;
       const filesArray = Array.from(files);
       return filesArray.every((file) => SUPPORTED_FORMATS.includes(file.type));
     },
     { message: 'Type de fichier invalide (JPEG, PNG ou PDF seulement)' }
   ),
   category: z.string().min(1, "Category is required"),
//    author: z.string().min(2, "Author name is required"),
   popular: z.boolean().default(false),
 });
 
 // Form values type derived from schema
 export type BlogFormValues = z.infer<typeof blogFormSchema>;