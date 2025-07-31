import { useEffect, useState, useCallback } from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import PhotoItem from "../MediaItems/PhotoItem";
import VideoItem from "../MediaItems/VideoItem";
import AudioItem from "../MediaItems/AudioItem";
import { getGalleryStories } from "../../../services/gallery";
import type { MediaType, GalleryStory } from "../../../types/Gallery";
import css from "./Gallery.module.css";

type Props = {
  selectedMediaType: MediaType;
  onMediaTypeChange: (mediaType: MediaType) => void;
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
};

export default function Gallery({
  selectedMediaType,
  onMediaTypeChange,
  selectedCategoryId,
  onCategoryChange,
}: Props) {
  const [stories, setStories] = useState<GalleryStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadStories = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const currentPage = reset ? 1 : page;
        const response = await getGalleryStories({
          mediaType: selectedMediaType,
          categoryId: selectedCategoryId || undefined,
          page: currentPage,
          limit: 12,
        });

        if (reset) {
          setStories(response.stories);
          setPage(1);
        } else {
          setStories((prev) => [...prev, ...response.stories]);
        }

        setHasMore(response.hasMore);
      } catch (error) {
        console.error("Failed to load gallery stories:", error);
      } finally {
        setLoading(false);
      }
    },
    [selectedMediaType, selectedCategoryId, page]
  );

  // Load stories when filters change
  useEffect(() => {
    loadStories(true);
  }, [selectedMediaType, selectedCategoryId, loadStories]);

  const handleShowMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);

      // Load more stories with the next page
      const loadMore = async () => {
        setLoading(true);
        try {
          const response = await getGalleryStories({
            mediaType: selectedMediaType,
            categoryId: selectedCategoryId || undefined,
            page: nextPage,
            limit: 12,
          });

          setStories((prev) => [...prev, ...response.stories]);
          setHasMore(response.hasMore);
        } catch (error) {
          console.error("Failed to load more gallery stories:", error);
        } finally {
          setLoading(false);
        }
      };

      loadMore();
    }
  };

  const renderMediaItem = (story: GalleryStory, index: number) => {
    switch (selectedMediaType) {
      case "photo":
        return <PhotoItem key={story._id} story={story} index={index} />;
      case "video":
        return <VideoItem key={story._id} story={story} />;
      case "audio":
        return <AudioItem key={story._id} story={story} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.filterWrapper}>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "photo" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("photo")}
          >
            Photos
          </button>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "video" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("video")}
          >
            Videos
          </button>
          <button
            type="button"
            className={`${css.filterButton} ${
              selectedMediaType === "audio" ? css.active : ""
            }`}
            onClick={() => onMediaTypeChange("audio")}
          >
            Audios
          </button>
          <CategoryDropdown
            value={selectedCategoryId}
            onChange={onCategoryChange}
          />
        </div>

        <div className={`${css.grid} ${css[selectedMediaType + "Grid"]}`}>
          {stories.map((story, index) => renderMediaItem(story, index))}
        </div>

        {loading && <LoadingSpinner />}

        {!loading && stories.length === 0 && (
          <div className={css.empty}>
            No {selectedMediaType} content found for the selected filters.
          </div>
        )}

        {!loading && hasMore && stories.length > 0 && (
          <OutlineButton onClick={handleShowMore}>Show more</OutlineButton>
        )}
      </div>
    </>
  );
}
