import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AllImageGallery() {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gallery");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/gallery/${id}`),
    onSuccess: () => {
      toast.success("Image deleted");
      queryClient.invalidateQueries(["gallery"]);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/gallery/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["gallery"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Gallery Images</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.data?.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <img
              src={item.image_url}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() =>
                  toggleMutation.mutate({
                    id: item._id,
                    status: item.status === "active" ? "deactive" : "active",
                  })
                }
                className={`btn btn-sm ${
                  item.status === "active" ? "btn-success" : "btn-warning"
                }`}
              >
                {item.status}
              </button>

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
    </div>
  );
}
