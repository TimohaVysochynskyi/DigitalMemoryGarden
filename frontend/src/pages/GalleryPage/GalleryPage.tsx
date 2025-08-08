import { useState, useEffect } from "react";
import Gallery from "../../components/gallery/Gallery/Gallery";
import Hero from "../../components/gallery/Hero/Hero";
import AddStory from "../../components/gallery/AddStory/AddStory";
import PhotoModal from "../../components/gallery/PhotoModal/PhotoModal";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import { getAllCategories } from "../../services/category";
import type { MediaType, GalleryStory } from "../../types/Gallery";
import type { Category } from "../../types/category";

export default function GalleryPage() {
  const [selectedMediaType, setSelectedMediaType] =
    useState<MediaType>("photo");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryStory | null>(null);

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
    window.location.reload();
  };

  const handlePhotoClick = (story: GalleryStory) => {
    setSelectedPhoto(story);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
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
          onPhotoClick={handlePhotoClick}
        />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <AddStory categories={categories} onStoryAdded={handleStoryAdded} />
      </FadeInOnScroll>

      {selectedPhoto && selectedPhoto.media.photo && (
        <PhotoModal
          photoUrl={selectedPhoto.media.photo}
          title={selectedPhoto.title}
          author={selectedPhoto.name}
          category={selectedPhoto.category.name}
          onClose={closePhotoModal}
        />
      )}
    </>
  );
}
