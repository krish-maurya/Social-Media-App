import { Image } from "@imagekit/next";

type ImageComponentProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  tr?: boolean;
};

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  className,
  tr = false,
}: ImageComponentProps) {
  const transformations = tr
    ? [
        { width: width?.toString() || "auto" },
        { height: height?.toString() || "auto" }
      ]
    : [];

  return (
    <Image
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
      src={src}
      alt={alt}
      width={width}
      height={height}
      //  @ts-expect-error - lqip is supported but types are outdated
      lqip={{ active: true, quality: 20 }}
      {...(tr && { transformation: transformations })}
      className={className}
    />
  );
}