import type { ImgHTMLAttributes } from "react";
import { getResponsiveImage, type ResponsiveImageAsset } from "../../config/assets";

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  asset?: ResponsiveImageAsset;
};

export function OptimizedImage({ src, asset, sizes = "100vw", width, height, ...imageProps }: OptimizedImageProps) {
  const responsive = asset ?? getResponsiveImage(src);

  if (!responsive) {
    return <img src={src} width={width} height={height} {...imageProps} />;
  }

  return (
    <picture className="optimized-picture">
      {responsive.avifSrcSet ? <source type="image/avif" srcSet={responsive.avifSrcSet} sizes={sizes} /> : null}
      {responsive.webpSrcSet ? <source type="image/webp" srcSet={responsive.webpSrcSet} sizes={sizes} /> : null}
      <img
        src={responsive.src}
        width={width ?? responsive.width}
        height={height ?? responsive.height}
        {...imageProps}
      />
    </picture>
  );
}
