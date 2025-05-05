import React from 'react';
 
 interface BlogFormHeaderProps {
   isEditing: boolean;
 }
 
 const BlogFormHeader: React.FC<BlogFormHeaderProps> = ({ isEditing }) => {
   return (
     <div>
       <h2 className="text-2xl font-bold tracking-tight">
         {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
       </h2>
       <p className="text-muted-foreground mt-2">
         {isEditing ? 'Update the blog post details below.' : 'Fill in the details to create a new blog post.'}
       </p>
     </div>
   );
 };
 
 export default BlogFormHeader;