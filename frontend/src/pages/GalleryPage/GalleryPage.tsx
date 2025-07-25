import Gallery from "../../components/gallery/Gallery/Gallery";
import Hero from "../../components/gallery/Hero/Hero";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";

export default function GalleryPage() {
  return (
    <>
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Gallery />
      </FadeInOnScroll>
    </>
  );
}
