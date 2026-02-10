import { Image } from "@imagekit/next";

type ImageComponentProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  enhanced?: boolean;
};

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  className,
  enhanced = false,
}: ImageComponentProps) {
  const transformations = [
    ...(width ? [{ width }] : []),
    ...(height ? [{ height }] : []),
    ...(enhanced ? [{ q: 100 }, { dpr: 2 }] : []),
  ];

  return (
    <Image
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
      src={src}
      alt={alt}
      className={className}
      width={width}        
      height={height}      
      transformation={transformations}
    />
  );
}
