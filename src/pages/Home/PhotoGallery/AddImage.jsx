import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../component/LoadingSpinner";

const categories = [
  "Education",
  "Vocational",
  "Commemoration",
  "Slum Education",
  "ECCD",
];

export default function AddImage() {
  const { register, handleSubmit, reset, watch } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const imageFile = watch("image");

  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/gallery", data),
    onSuccess: () => {
      toast.success("Image added successfully");
      queryClient.invalidateQueries(["gallery"]);
      reset();
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
        formData
      );

      mutation.mutate({
        title: data.title,
        category: data.category,
        image_url: imgRes.data.data.url,
        added_by: user?.email,
        created_at: new Date(),
      });
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="p-6 mb-5 w-full">
      {mutation.isPending && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Gallery Image</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <input
              {...register("title", { required: true })}
              placeholder="Image Title"
              className="input input-bordered w-full"
            />

            {/* Category */}
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Image */}
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="file-input w-full"
            />

            <button className="btn btn-primary w-full">Add Image</button>
          </form>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          {/* SAFE Image Preview */}
          {imageFile &&
            imageFile.length > 0 &&
            imageFile[0] instanceof File && (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="Preview"
                className="w-full h-full object-cover p-2 shadow-sm rounded-xl"
              />
            )}
        </div>
      </div>
    </div>
  );
}
