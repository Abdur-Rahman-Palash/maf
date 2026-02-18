'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaFile, FaImage, FaVideo, FaFileAlt, FaTimes, FaCheck } from 'react-icons/fa';

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  multiple?: boolean;
  className?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  accept = '*/*',
  maxFiles = 5,
  maxSize = 10,
  multiple = true,
  className = ''
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FaImage className="text-green-500" />;
    if (file.type.startsWith('video/')) return <FaVideo className="text-purple-500" />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FaFileAlt className="text-blue-500" />;
    return <FaFile className="text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    // Add valid files
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    // Simulate upload progress
    newUploadedFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile);
    });

    if (onFilesChange && validFiles.length > 0) {
      onFilesChange(validFiles);
    }
  };

  const simulateUpload = (uploadedFile: UploadedFile) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => {
        const updated = prev.map(f => {
          if (f.id === uploadedFile.id) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' as const : 'uploading' as const
            };
          }
          return f;
        });

        const completed = updated.find(f => f.id === uploadedFile.id);
        if (completed?.status === 'completed') {
          clearInterval(interval);
        }

        return updated;
      });
    }, 300);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          animate={{ scale: isDragActive ? 1.05 : 1 }}
          className="space-y-4"
        >
          <FaCloudUploadAlt className={`mx-auto text-4xl ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse
            </p>
          </div>
          <div className="text-xs text-gray-400">
            Max {maxFiles} files • Max {maxSize}MB each
          </div>
        </motion.div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <h4 className="font-medium text-gray-700">Uploaded Files ({uploadedFiles.length})</h4>
            {uploadedFiles.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="text-xl">
                  {getFileIcon(uploadedFile.file)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  
                  {/* Progress Bar */}
                  {uploadedFile.status === 'uploading' && (
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <motion.div
                        className="bg-blue-500 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadedFile.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {uploadedFile.status === 'completed' && (
                    <FaCheck className="text-green-500 text-sm" />
                  )}
                  {uploadedFile.status === 'error' && (
                    <span className="text-red-500 text-xs">Error</span>
                  )}
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
