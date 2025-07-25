import { useState, useEffect } from "react";
import PopupOverlay from "../../components/common/PopupOverlay/PopupOverlay";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import Hero from "../../components/garden/Hero/Hero";
import MapWrapper from "../../components/garden/MapWrapper/MapWrapper";
import FlowerDetails from "../../components/garden/FlowerDetails/FlowerDetails";
import FlowerSelection from "../../components/garden/FlowerSelection/FlowerSelection";
import PlantFlowerForm from "../../components/garden/PlantFlowerForm/PlantFlowerForm";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import { getAllCategories } from "../../services/category";
import type { Category } from "../../types/category";
import {
  addStory,
  getRandomFlowerStory,
  searchStories,
  getNextFlowerStory,
  getPrevFlowerStory,
} from "../../services/story";
import type { Story } from "../../types/story";

import css from "./GardenPage.module.css";

export default function GardenPage() {
  function handleNextFlower() {
    if (!randomFlower) return;
    getNextFlowerStory({ id: randomFlower._id }).then((next) => {
      if (next) setRandomFlower(next);
    });
  }

  function handlePrevFlower() {
    if (!randomFlower) return;
    getPrevFlowerStory({ id: randomFlower._id }).then((prev) => {
      if (prev) setRandomFlower(prev);
    });
  }
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [flowerDetailsVisible, setFlowerDetailsVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [randomFlower, setRandomFlower] = useState<Story | null>(null);
  const [searchError, setSearchError] = useState<string>("");
  const [randomLoading, setRandomLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        if (data.length) setSelectedCategoryId(data[0]._id);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setRandomLoading(true);
    getRandomFlowerStory()
      .then((story) => {
        if (story && typeof story.category === "object") {
          const cat = story.category as Partial<Category>;
          const category: Category = {
            _id: cat._id || "",
            name: cat.name || "",
            flowerImage:
              typeof cat.flowerImage === "string" ? cat.flowerImage : "",
            description:
              typeof cat.description === "string" ? cat.description : undefined,
            flowerAnimation:
              typeof cat.flowerAnimation === "string"
                ? cat.flowerAnimation
                : undefined,
          };
          setRandomFlower({ ...story, category });
        } else if (story && typeof story.category === "string") {
          setRandomFlower({ ...story });
        }
      })
      .finally(() => setRandomLoading(false));
  }, []);

  const handlePlantFlower = async (
    values: {
      name: string;
      age: string | number | null;
      location: string;
      title: string;
      comment: string;
    },
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => {
    await addStory({
      name: values.name,
      age: values.age === "" || values.age === null ? undefined : values.age,
      location: values.location,
      title: values.title,
      comment: values.comment,
      category: selectedCategoryId,
      source: "flower",
      audio: files.audio ?? undefined,
      photo: files.photo ?? undefined,
      video: files.video ?? undefined,
    });
    // show success, reset form, etc.
  };

  const handleSearchFlower = async (input: string | Story) => {
    setSearchError("");
    if (typeof input === "object" && input._id) {
      setRandomFlower(input);
      setFlowerDetailsVisible(false);
      setSearchBarVisible(false);
      return;
    }
    if (typeof input !== "string" || !input.trim()) return;
    try {
      const results = await searchStories(input);
      if (results.length > 0) {
        setRandomFlower(results[0]);
        setFlowerDetailsVisible(false);
        setSearchBarVisible(false);
      } else {
        setSearchError("No flowers found for your query.");
      }
    } catch {
      setSearchError("Search failed. Please try again.");
    }
  };

  if (loading || randomLoading) return <div>Loading...</div>;

  return (
    <>
      <FadeInOnScroll>
        <Hero
          onSearch={() => setSearchBarVisible(true)}
          onDetails={() => setFlowerDetailsVisible(true)}
          flower={randomFlower}
        />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MapWrapper categories={categories} />
      </FadeInOnScroll>
      <div className={css.plantWrapper} id="plant-new-memory-flower">
        <FlowerSelection
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
        <PlantFlowerForm
          selectedCategoryId={selectedCategoryId}
          onSubmit={handlePlantFlower}
        />
      </div>
      {searchBarVisible && (
        <PopupOverlay onClose={() => setSearchBarVisible(false)}>
          <SearchBar
            onClose={() => setSearchBarVisible(false)}
            onSearch={handleSearchFlower}
            error={searchError}
          />
        </PopupOverlay>
      )}
      {flowerDetailsVisible && randomFlower && (
        <PopupOverlay onClose={() => setFlowerDetailsVisible(false)}>
          <FlowerDetails
            story={randomFlower}
            onClose={() => setFlowerDetailsVisible(false)}
            onNext={handleNextFlower}
            onPrev={handlePrevFlower}
          />
        </PopupOverlay>
      )}
    </>
  );
}
