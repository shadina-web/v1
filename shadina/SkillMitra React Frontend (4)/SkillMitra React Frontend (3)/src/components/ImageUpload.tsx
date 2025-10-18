import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  type: 'profile' | 'portfolio' | 'certificate';
  maxImages?: number;
  onImagesChange?: (images: string[]) => void;
}

export function ImageUpload({ type, maxImages = 5, onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      // Simulate upload - in real app, upload to server
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image`);
          continue;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            
            if (newImages.length === files.length) {
              const updatedImages = [...images, ...newImages];
              setImages(updatedImages);
              onImagesChange?.(updatedImages);
              toast.success(`${files.length} image(s) uploaded successfully`);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
    toast.success('Image removed');
  };

  const titles = {
    profile: 'Profile Photo',
    portfolio: 'Work Portfolio',
    certificate: 'Certificates & Documents'
  };

  const descriptions = {
    profile: 'Upload a clear photo of yourself',
    portfolio: 'Showcase your work with images',
    certificate: 'Upload certificates and qualifications'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titles[type]}</CardTitle>
        <CardDescription>{descriptions[type]}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={type !== 'profile'}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || (type === 'profile' && images.length >= 1) || images.length >= maxImages}
            className="gap-2"
          >
            <Upload className="size-4" />
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
          <span className="text-sm text-muted-foreground">
            {images.length} / {type === 'profile' ? 1 : maxImages} images
          </span>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className={`grid gap-4 ${
            type === 'profile' 
              ? 'grid-cols-1' 
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
          }`}>
            {images.map((image, index) => (
              <div key={index} className="relative group">
                {type === 'profile' ? (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="size-20">
                      <AvatarImage src={image} />
                      <AvatarFallback>
                        <ImageIcon className="size-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Profile Photo</p>
                      <Badge variant="secondary" className="mt-1">
                        <CheckCircle className="size-3 mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="text-destructive"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <div className="border-2 border-dashed rounded-lg p-12 text-center">
            <ImageIcon className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              No images uploaded yet
            </p>
            <p className="text-xs text-muted-foreground">
              Click "Upload Images" to add photos (max 5MB each)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
