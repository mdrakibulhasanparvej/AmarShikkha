import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../hook/cropImage";
import LoadingSpinner from "../../../component/LoadingSpinner";
import { toast } from "react-toastify";
import axios from "axios";

const AddActivities = () => {
  const { register, watch, reset, handleSubmit } = useForm();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const watchFields = watch(); // watch all fields: title, description, image

  // Show cropper when file selected
  useEffect(() => {
    if (watchFields.image?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCrop(true);
      };
      reader.readAsDataURL(watchFields.image[0]);
    }
  }, [watchFields.image]);

  // Mutation to add activity
  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/activities", data),
    onSuccess: () => {
      toast.success("Activity added successfully!");
      queryClient.invalidateQueries(["activities"]);
      reset();
      setImageSrc(null);
      setCroppedBlob(null);
      setShowCrop(false);
    },
  });

  // Crop the image
  const saveCrop = async () => {
    const cropped = await getCroppedImg(imageSrc, pixels);
    setCroppedBlob(cropped);
    setImageSrc(URL.createObjectURL(cropped));
    setShowCrop(false);
  };

  // Upload image & submit form
  const onSubmit = async (data) => {
    if (!croppedBlob) return toast.error("Please crop the image first");

    try {
      const formData = new FormData();
      formData.append("image", croppedBlob);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
        formData
      );

      mutation.mutate({
        title: data.title,
        description: data.description,
        image_url: imgRes.data.data.url,
        added_by: user?.email,
      });
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="p-6">
      {mutation.isPending && <LoadingSpinner />}
      <h2 className="text-2xl font-bold mb-6 text-center">Add Activity</h2>

      {/* Grid layout: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="file-input w-full"
          />
          <input
            type="text"
            placeholder="Activity Title"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            Add Activity
          </button>
        </form>

        {/* Right column: Live Preview */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          {imageSrc && (
            <img
              src={imageSrc}
              className="w-full h-48 object-cover rounded-xl mb-2"
            />
          )}
          {watchFields.title && (
            <h4 className="text-md font-medium">{watchFields.title}</h4>
          )}
          {watchFields.description && (
            <p className="text-gray-600">{watchFields.description}</p>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      {showCrop && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-4xl h-[400px] bg-gray-800 rounded-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, p) => setPixels(p)}
            />
          </div>
          <button onClick={saveCrop} className="btn btn-success mt-4">
            Crop & Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AddActivities;
