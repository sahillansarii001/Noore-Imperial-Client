'use client';
import { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

export default function InspirationUpload({ images, setImages }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, upload to cloudinary and get URLs. Mocking here with object URLs.
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-gold bg-gold/5' : 'border-white/20 bg-[#111] hover:border-gold/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const files = Array.from(e.dataTransfer.files);
          const newImages = files.map(file => URL.createObjectURL(file));
          setImages(prev => [...prev, ...newImages]);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="w-10 h-10 text-grey mx-auto mb-4" />
        <p className="font-montserrat text-sm text-ivory uppercase tracking-widest mb-2">Drag & Drop Inspiration Images</p>
        <p className="font-poppins text-xs text-grey">or click to browse from your device</p>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square border border-white/10 group">
              <img src={img} alt="Inspiration" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-1 rounded backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
