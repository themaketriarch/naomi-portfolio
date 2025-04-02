import { useEffect, useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type LoadingValue = ImageProps["loading"];

export default function ProjectImage({
  src,
  alt,
  className,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority: boolean;
  loading?: LoadingValue;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src); // Update imgSrc when src changes
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="100vw"
      className={className}
      width={width}
      height={height}
      onError={() => setImgSrc("/placeholder.jpg")}
    />
  );
}
