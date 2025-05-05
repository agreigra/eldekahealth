import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FileUploadProps {
  id: string;
  label: string;
  description?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  value?: string[];
  accept?: string;
  maxFiles?: number;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  description,
  multiple = false,
  onChange,
  value = [],
  accept = "image/*",
  maxFiles = 10,
  error,
}) => {
  // const [previewUrls, setPreviewUrls] = useState<string[]>(value || []);
  const [previewItems, setPreviewItems] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (value && value.length) {
      setPreviewItems(value); // value is an array of image URLs from the backend
    }
  }, [value]);

  const buildUrl = (url: string) => {
    return "http://localhost:8081/api/" + url;
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = e.target.files;

  //   if (!selectedFiles || selectedFiles.length === 0) return;

  //   // setPreviewItems((prev) => [...prev, ...selectedFiles]);
  //   // Check if adding these files would exceed maxFiles
  //   if (multiple && previewItems.length + selectedFiles.length > maxFiles) {
  //     alert(`You can only upload a maximum of ${maxFiles} files.`);
  //     return;
  //   }

  //   const files = Array.from(selectedFiles);
  //   const newPreviews: string[] = [];

  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target?.result) {
  //         const result = e.target.result as string;

  //         if (!multiple) {
  //           setPreviewItems([result]);
  //           onChange([file]);
  //         } else {
  //           setPreviewItems((prev) => {
  //             const updated = [...prev, result];
  //             return updated;
  //           });
  //           onChange(files);
  //         }
  //         newPreviews.push(result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles);

    // Limit max files
    if (multiple && previewItems.length + files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    if (!multiple) {
      setPreviewItems([files[0]]);
      onChange([files[0]]);
    } else {
      setPreviewItems((prev) => [...prev, ...files]);
      onChange([...files]); // or combine with previous if needed
    }
  };

  const removeFile = (index: number) => {
    setPreviewItems((prev) => prev.filter((_, i) => i !== index));
    // Inform parent component of change
    onChange([]); // In a real app, you'd need to handle this better
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {multiple && (
          <span className="text-xs text-gray-500">
            {previewItems.length}/{maxFiles} files
          </span>
        )}
      </div>

      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer bg-white rounded-md font-medium text-medical-600 hover:text-medical-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-medical-500"
            >
              <span>Upload {multiple ? "files" : "a file"}</span>
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {previewItems.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewItems.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={
                    typeof url === "string"
                      ? buildUrl(url)
                      : URL.createObjectURL(url)
                  }
                  alt={`Preview ${index}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
