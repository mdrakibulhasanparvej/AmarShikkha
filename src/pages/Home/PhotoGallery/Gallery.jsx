import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import GalleryCard from "./GalleryCard";
import GalleryFilter from "./GalleryFilter";
import LoadingSpinner from "../../../component/LoadingSpinner";

const categories = [
  "All",
  "Education",
  "Vocational",
  "Commemoration",
  "Slum Education",
  "ECCD",
];

export default function Gallery() {
  const axiosSecure = useAxios();
  const [selected, setSelected] = useState("All");

  const { data = {}, isLoading } = useQuery({
    queryKey: ["gallery", selected],
    queryFn: async () => {
      const res = await axiosSecure.get(`/gallery?category=${selected}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="bg-white dark:bg-gray-900 py-10 px-20">
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>

      <GalleryFilter
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {data?.data?.map((item) => (
          <GalleryCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
