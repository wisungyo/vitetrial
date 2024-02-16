import HeaderTransparent from "@/components/Shared/HeaderTransparent";
import GalleryHorizontal from "@/ltc-core/block/Gallery/GalleryWithBullets";

type Image = {
  imageSrc: string;
  alt: string;
};

type TypeProductDetailGallery = {
  images: Image[];
};

export default function ProductDetailGallery({
  images,
}: TypeProductDetailGallery) {
  return (
    <>
      <HeaderTransparent />
      <GalleryHorizontal images={images} />
    </>
  );
}
