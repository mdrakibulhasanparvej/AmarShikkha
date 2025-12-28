import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../component/LoadingSpinner";
import ViewModal from "../Swiper/ViewModal";

const AllNewsGallery = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/news");
      return res.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/news/${id}`),
    onSuccess: () => {
      toast.success("News deleted");
      queryClient.invalidateQueries(["news"]);
    },
  });

  // Truncate helper function
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All News Gallery</h2>
      {news.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow flex flex-col"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.date}</p>
              {/* Truncated Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {truncateText(item.description, 140)}
              </p>
              <div className="flex justify-between mt-4">
                <ViewModal news={item} />
                <button
                  onClick={() => deleteMutation.mutate(item._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNewsGallery;
