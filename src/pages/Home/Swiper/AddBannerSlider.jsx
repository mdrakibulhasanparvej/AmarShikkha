import axios from "axios";
import Cropper from "react-easy-crop";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import LoadingSpinner from "../../../component/LoadingSpinner";
import { toast } from "react-toastify";
import { getCroppedImg } from "../../../hook/cropImage";

const AddBannerSlider = () => {
  const { register, watch, reset } = useForm();
  const [imageSrc, setImageSrc] = useState(null); // original or cropped image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const bannerFile = watch("banner");

  // When user selects file, show cropper
  useEffect(() => {
    if (bannerFile?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCrop(true);
      };
      reader.readAsDataURL(bannerFile[0]);
    }
  }, [bannerFile]);

  const mutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/add-banner", data),
    onSuccess: () => {
      toast.success("Banner Added");
      queryClient.invalidateQueries(["banners"]);
      reset();
      setImageSrc(null);
      setCroppedBlob(null);
      setShowCrop(false);
    },
  });

  // Crop the image and store blob
  const saveCrop = async () => {
    const cropped = await getCroppedImg(imageSrc, pixels);
    setCroppedBlob(cropped);
    setImageSrc(URL.createObjectURL(cropped));
    setShowCrop(false);
  };

  // Upload cropped image
  const handleUpload = async () => {
    if (!croppedBlob) return toast.error("Please crop the image first");

    try {
      const formData = new FormData();
      formData.append("image", croppedBlob);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`,
        formData
      );

      mutation.mutate({
        image_url: imgRes.data.data.url,
        added_by: user?.email,
      });
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      {mutation.isPending && <LoadingSpinner />}

      <h2 className="text-xl font-bold mb-4">Add Banner</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          {...register("banner", { required: true })}
          className="file-input w-full"
        />

        {imageSrc && !showCrop && (
          <img src={imageSrc} className="w-full h-48 object-cover rounded-xl" />
        )}

        <button
          type="button"
          onClick={handleUpload}
          className="btn btn-primary w-full"
        >
          Add Banner
        </button>
      </form>

      {showCrop && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-4xl h-[400px] bg-gray-800 rounded-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 6}
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

export default AddBannerSlider;
