import { useState, useEffect, memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg==";

const useImageLoader = (src: string, priority = false) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(PLACEHOLDER_IMAGE);

  useEffect(() => {
    setIsLoading(true);
    setCurrentSrc(PLACEHOLDER_IMAGE);
    
    if (priority) {
      setCurrentSrc(src);
      setIsLoading(false);
      return;
    }
    
    const img = document.createElement('img');
    img.src = src;
    
    const handleLoad = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
    
    img.addEventListener('load', handleLoad);
    
    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src, priority]);

  return { isLoading, currentSrc, setIsLoading };
};

const LazyImage = memo(({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
}: LazyImageProps) => {
  const { isLoading, currentSrc, setIsLoading } = useImageLoader(src, priority);

  return (
    <div className="h-full w-full">
      <Image
        src={priority ? src : currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "duration-700 ease-in-out h-full w-full",
          isLoading
            ? "grayscale blur-sm scale-105"
            : "grayscale-0 blur-0 scale-100",
          className
        )}
        priority={priority}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage; 