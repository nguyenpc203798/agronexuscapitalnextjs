import { useState, memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  blurDataURL?: string;
}

const LazyImage = memo(({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  quality = 95,
  unoptimized = false,
  blurDataURL,
}: LazyImageProps) => {
  // Nếu là ảnh priority, không cần placeholder
  const [isLoading, setIsLoading] = useState(!priority);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        unoptimized={unoptimized}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
        className={cn(
          "duration-500 ease-in-out h-full w-full object-cover",
          isLoading
            ? "grayscale blur-sm scale-105"
            : "grayscale-0 blur-0 scale-100",
          className
        )}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;
