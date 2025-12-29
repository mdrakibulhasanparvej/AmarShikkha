import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../hooks/cropImage";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import axios from "axios";

const AddNews = () => {
  const { register, watch, handleSubmit, reset } = useForm();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const watchFields = watch();

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

  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/news", data),
    onSuccess: () => {
      toast.success("News added successfully!");
      queryClient.invalidateQueries(["news"]);
      reset();
      setImageSrc(null);
      setCroppedBlob(null);
      setShowCrop(false);
    },
  });

  const saveCrop = async () => {
    const cropped = await getCroppedImg(imageSrc, pixels);
    setCroppedBlob(cropped);
    setImageSrc(URL.createObjectURL(cropped));
    setShowCrop(false);
  };

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
        date: data.date,
        image_url: imgRes.data.data.url,
        added_by: user?.email,
      });
    } catch {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="p-6 flex gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/2">
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="file-input w-full"
        />
        <input
          type="text"
          placeholder="News Title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          {...register("date", { required: true })}
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add News
        </button>
      </form>

      {/* Live Preview */}
      <div className="w-1/2 rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
        {(watchFields.title || watchFields.description || imageSrc) && (
          <div className="">
            {imageSrc && (
              <img
                src={imageSrc}
                className="w-full h-full object-cover rounded mb-2"
              />
            )}
            {watchFields.title && (
              <h4 className="font-medium">{watchFields.title}</h4>
            )}
            {watchFields.date && (
              <p className="text-gray-600">{watchFields.date}</p>
            )}
            {watchFields.description && (
              <p className="text-gray-600">{watchFields.description}</p>
            )}
          </div>
        )}
      </div>

      {showCrop && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-4xl h-[400px] bg-gray-800 rounded-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 5}
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

      {mutation.isPending && <LoadingSpinner />}
    </div>
  );
};

export default AddNews;
