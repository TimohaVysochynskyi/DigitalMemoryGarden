import Hero from "../../components/home/Hero/Hero";
import MemoryTools from "../../components/home/MemoryTools/MemoryTools";
import Map from "../../components/home/Map/Map";
import Numbers from "../../components/home/Numbers/Numbers";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";

export default function HomePage() {
  return (
    <>
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MemoryTools />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Map />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Numbers />
      </FadeInOnScroll>
    </>
  );
}
