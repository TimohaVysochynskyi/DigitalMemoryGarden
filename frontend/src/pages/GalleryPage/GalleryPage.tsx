import { useState, useEffect } from "react";
import Gallery from "../../components/gallery/Gallery/Gallery";
import Hero from "../../components/gallery/Hero/Hero";
import AddStory from "../../components/gallery/AddStory/AddStory";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import { getAllCategories } from "../../services/category";
import type { MediaType } from "../../types/Gallery";
import type { Category } from "../../types/category";

export default function GalleryPage() {
  const [selectedMediaType, setSelectedMediaType] =
    useState<MediaType>("photo");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleMediaTypeChange = (mediaType: MediaType) => {
    setSelectedMediaType(mediaType);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleStoryAdded = () => {
    // Refresh gallery or show success message
    window.location.reload();
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
      <FadeInOnScroll>
        <AddStory categories={categories} onStoryAdded={handleStoryAdded} />
      </FadeInOnScroll>
    </>
  );
}
