import { useState } from "react";
import Gallery from "../../components/gallery/Gallery/Gallery";
import Hero from "../../components/gallery/Hero/Hero";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import type { MediaType } from "../../types/Gallery";

export default function GalleryPage() {
  const [selectedMediaType, setSelectedMediaType] =
    useState<MediaType>("photo");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleMediaTypeChange = (mediaType: MediaType) => {
    setSelectedMediaType(mediaType);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <FadeInOnScroll>
        <Hero
          selectedMediaType={selectedMediaType}
          onMediaTypeChange={handleMediaTypeChange}
        />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Gallery
          selectedMediaType={selectedMediaType}
          onMediaTypeChange={handleMediaTypeChange}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={handleCategoryChange}
        />
      </FadeInOnScroll>
    </>
  );
}
