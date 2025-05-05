import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BlogFormActionsProps {
  isEditing: boolean;
  isLoading: boolean;
}

const BlogFormActions: React.FC<BlogFormActionsProps> = ({
  isEditing,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/admin/blogs")}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="bg-medical-600 hover:bg-medical-700"
        disabled={isLoading}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
        )}
        {isEditing ? "Update Blog Post" : "Create Blog Post"}
      </Button>
    </div>
  );
};

export default BlogFormActions;
