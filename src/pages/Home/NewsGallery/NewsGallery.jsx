import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import NewsGalleryCard from "./NewsGalleryCard";
import LoadingSpinner from "../../../component/LoadingSpinner";

const NewsGallery = () => {
  const axiosSecure = useAxios();
  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/news");
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-100 py-12 px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-widest text-gray-800">
          — News Gallery —
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {news.map((item) => (
          <NewsGalleryCard key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default NewsGallery;
