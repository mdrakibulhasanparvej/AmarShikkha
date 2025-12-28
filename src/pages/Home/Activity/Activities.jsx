import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import ActivityCard from "./ActivityCard";

const Activities = () => {
  const axiosSecure = useAxios();

  // Fetch activities
  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/activities?status=active");
      return res.data.data; // because our API sends { success, data, ... }
    },
  });

  if (isLoading) return <p className="text-center my-10">Loading...</p>;
  if (isError)
    return <p className="text-center my-10">Failed to load activities</p>;

  return (
    <section className="w-full my-10 mx-auto px-20">
      <h1 className="text-4xl text-center font-bold text-gray-600">
        Our Activities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              image={activity.image_url}
              title={activity.title}
              description={activity.description}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No activities found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Activities;
