import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../component/LoadingSpinner";
import ViewModal from "../Swiper/ViewModal";

const AllActivities = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // GET activities
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/activities");
      return res.data.data;
    },
  });

  // Toggle status mutation (if you have status field in activities)
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/activities/${id}`, { status }),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["activities"]);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/activities/${id}`),
    onSuccess: () => {
      toast.success("Activity deleted");
      queryClient.invalidateQueries(["activities"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="bg-white p-4 rounded-lg shadow flex flex-col"
            >
              <img
                src={activity.image_url}
                alt={activity.title}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{activity.title}</h3>
              <p className="text-gray-600 mt-1">{activity.description}</p>

              <div className="p-3 flex justify-between items-center space-x-2">
                {/* Edit / View */}
                <ViewModal activity={activity} />

                {/* Toggle Active/Deactive */}
                {activity.status && (
                  <button
                    onClick={() =>
                      toggleStatusMutation.mutate({
                        id: activity._id,
                        status:
                          activity.status === "active" ? "deactive" : "active",
                      })
                    }
                    className={`btn btn-sm ${
                      activity.status === "active"
                        ? "btn-success"
                        : "btn-warning"
                    }`}
                  >
                    {activity.status === "active" ? "Active" : "Deactive"}
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => deleteMutation.mutate(activity._id)}
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

export default AllActivities;
