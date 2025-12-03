import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { fileToBase64 } from '../utils/imageHelper';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      onImageSelected(base64);
    } catch (err) {
      console.error("Error reading file", err);
      alert("Failed to read file.");
    }
  };

  return (
    <div 
      className={`relative w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group
        ${isDragging 
          ? 'border-blue-500 bg-blue-500/10 scale-[1.01]' 
          : 'border-slate-700 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col items-center gap-4 text-slate-400 group-hover:text-slate-200 transition-colors">
        <div className={`p-4 rounded-full bg-slate-800 shadow-xl transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
          {isDragging ? <Upload className="w-8 h-8 text-blue-400" /> : <ImageIcon className="w-8 h-8 text-slate-400" />}
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Click or drag image here</p>
          <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
