import { lazy, Suspense } from "react";

const SwiperSlider = lazy(() => import("./Swiper/SwiperSlider"));
const Activities = lazy(() => import("./Activity/Activities"));
const Facts = lazy(() => import("./Facts/Facts"));
const NewsGallery = lazy(() => import("./NewsGallery/NewsGallery"));
const Gallery = lazy(() => import("./PhotoGallery/Gallery"));
const SponsorSection = lazy(() => import("./SponsorSection/SponsorSection"));

const Home = () => {
  return (
    <div className="w-screen overflow-hidden">
      {/* 🔥 HERO / Above the fold */}
      <section className="min-h-[70vh]">
        <SwiperSlider />
      </section>

      {/* ⚡ Medium priority */}
      <Suspense fallback={<div>Loading content...</div>}>
        <section>
          <Activities />
        </section>

        <section>
          <Facts />
        </section>
      </Suspense>

      {/* 🐢 Heavy / Below the fold */}
      <Suspense fallback={<div>Loading gallery...</div>}>
        <section>
          <NewsGallery />
        </section>

        <section>
          <Gallery />
        </section>

        <section>
          <SponsorSection />
        </section>
      </Suspense>
    </div>
  );
};

export default Home;
