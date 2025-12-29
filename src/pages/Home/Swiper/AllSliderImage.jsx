import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import ViewModal from "./ViewModal";

const AllSliderImage = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [viewImage, setViewImage] = useState(null); // For view modal

  // Fetch banners
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-banners");
      return res.data.data;
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/update-banner/${id}`, { status }),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["update-banner"]);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/delete-banner/${id}`),
    onSuccess: () => {
      toast.success("Banner deleted");
      queryClient.invalidateQueries(["banners"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading banners.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Banners</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="card shadow">
            <img
              src={banner.image_url}
              className="h-40 object-cover cursor-pointer"
              onClick={() => setViewImage(banner.image_url)} // Open modal
            />

            <div className="p-3 flex justify-between items-center space-x-2">
              {/* Edit */}
              <ViewModal banner={banner} />

              {/* Toggle Active/Deactive */}
              <button
                onClick={() =>
                  toggleStatusMutation.mutate({
                    id: banner._id,
                    status: banner.status === "active" ? "deactive" : "active",
                  })
                }
                className={`btn btn-sm ${
                  banner.status === "active" ? "btn-success" : "btn-warning"
                }`}
              >
                {banner.status === "active" ? "Active" : "Deactive"}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteMutation.mutate(banner._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewImage && (
        <dialog open className="modal">
          <div className="modal-box relative max-w-4xl">
            <button
              onClick={() => setViewImage(null)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <img src={viewImage} className="w-full h-auto object-contain" />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllSliderImage;
