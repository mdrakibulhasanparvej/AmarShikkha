import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../component/LoadingSpinner";
import useAuth from "../../hook/useAuth";
import UpdateModal from "./UpdateModal";
import { useWorkplacesWithAutoAddress } from "../../hook/useWorkplacesWithAutoAddress";

const AddJobHolder = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const {
    workplaceNames,
    getAddressByWorkplace,
    loading: workplacesLoading,
  } = useWorkplacesWithAutoAddress();

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const watchFields = watch(); // ← YOUR STYLE, KEPT EXACTLY

  // const fetchWorkplaces = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axiosSecure.get("/all-workplaces");
  //     if (Array.isArray(res.data.data)) {
  //       setWorkplaces(res.data.data);
  //     } else {
  //       setWorkplaces([]);
  //       toast.error("Invalid data format from server.");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching workplaces:", err);
  //     toast.error("Failed to fetch workplaces.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchWorkplaces();
  // }, []);

  // const workplaceNames = workplaces.map((place) => place.name);

  // Auto-fill address when workplace changes

  // Auto-fill address when workplace changes
  useEffect(() => {
    if (watchFields.workplace) {
      const address = getAddressByWorkplace(watchFields.workplace);
      setValue("address", address, { shouldValidate: true });
    }
  }, [watchFields.workplace, getAddressByWorkplace, setValue]);

  const handleAddJobHolder = async (data) => {
    setLoading(true);
    try {
      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`;
      const res = await axios.post(imageAPIURL, formData);
      const photoURL = res.data.data.url;

      const jobHolderInfo = {
        photo_URL: photoURL,
        gender: data.gender,
        name: data.name,
        trade: data.trade,
        designation: data.designation,
        workplace: data.workplace,
        address: data.address,
        salary: data.salary,
        donner: data.donner,
        created_at: new Date(),
        added_by: user.email,
      };

      await axiosSecure.post("/add-job-holder", jobHolderInfo);
      toast.success("Added successfully", { autoClose: 2000 });
      reset();
      setPreviewPhoto(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {loading && <LoadingSpinner message="Adding Job Holder..." />}
      <h2 className="text-2xl font-bold">Add Job Holder Information</h2>

      <form onSubmit={handleSubmit(handleAddJobHolder)} className="mt-5 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* LEFT SIDE FORM */}
          <fieldset className="fieldset">
            <h2 className="text-xl font-bold my-2">Add here</h2>

            {/* Photo */}
            <label className="label font-bold">Photo</label>
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required",
                onChange: (e) =>
                  setPreviewPhoto(URL.createObjectURL(e.target.files[0])),
              })}
              className="file-input w-full"
            />
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* Gender */}
            <div className="my-5">
              <label className="label mr-5">
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  className="radio"
                  value="Male"
                />{" "}
                Male
              </label>
              <label className="label">
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="Female"
                  className="radio"
                />
                Female
              </label>
            </div>

            {/* Trade */}
            <label className="label">Trade</label>
            <select
              {...register("trade", { required: "Trade is required" })}
              className="select w-full"
            >
              <option value="">Select a Trade</option>
              <option>Electrical House Wiring</option>
              <option>Industrial Electrical Wiring</option>
              <option>Industrial Sewing</option>
              <option>Dressmaking & Tailoring</option>
              <option>Garments Machine Mechanics</option>
              <option>Computer Fundamentals</option>
              <option>Motorbike Mechanics</option>
              <option>Spoken English</option>
            </select>
            {errors.trade && (
              <p className="text-red-500">{errors.trade.message}</p>
            )}

            {/* Designation */}
            <label className="label">Designation</label>
            <input
              type="text"
              {...register("designation", {
                required: "Designation is required",
              })}
              className="input w-full"
              placeholder="Designation"
            />
            {errors.designation && (
              <p className="text-red-500">{errors.designation.message}</p>
            )}

            {/* Workplace */}
            <label className="label">Workplace</label>
            <select
              {...register("workplace", { required: "Workplace is required" })}
              className="select w-full"
            >
              <option value="">Select a Workplace</option>
              {workplaceNames.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.workplace && (
              <p className="text-red-500">{errors.workplace.message}</p>
            )}

            {/* Address - Now auto-filled correctly */}
            <label className="label">Address</label>
            <input
              type="text"
              // readOnly
              placeholder="Auto-filled from workplace"
              className="input w-full bg-gray-100 text-gray-800 font-medium"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}

            {/* Salary */}
            <label className="label">Salary</label>
            <input
              type="text"
              {...register("salary", {
                required: "Salary is required",
                pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
              })}
              className="input w-full"
              placeholder="Salary"
            />
            {errors.salary && (
              <p className="text-red-500">{errors.salary.message}</p>
            )}
            {/* Donner */}
            <label className="label">Donner</label>
            <select
              {...register("donner", { required: "Donner is required" })}
              className="select w-full"
            >
              <option value="">Select a donner</option>
              <option>GSRD</option>
              <option>PLANET</option>
            </select>
            {errors.trade && (
              <p className="text-red-500">{errors.trade.message}</p>
            )}
          </fieldset>

          {/* RIGHT SIDE – LIVE PREVIEW (YOUR EXACT STYLE) */}
          <fieldset className="fieldset">
            <h2 className="text-xl font-bold my-2">Live Preview</h2>
            <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-xl border p-4">
              {/* Photo */}
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Preview"
                  className="w-full h-74 object-cover rounded-md border"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 rounded-md border" />
              )}

              {/* Details - YOUR STYLE */}
              <div className="mt-5 text-sm leading-7">
                <div className="flex gap-2">
                  <span className="font-bold w-28">Name</span>
                  <span>: {watchFields.name || "---"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28">Trade</span>
                  <span>: {watchFields.trade || "---"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28">Designation</span>
                  <span>: {watchFields.designation || "---"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28">Workplace</span>
                  <span>: {watchFields.workplace || "---"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28">Address</span>
                  <span>: {watchFields.address || "---"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28">Salary</span>
                  <span className="flex items-center">
                    : {watchFields.salary || "---"} <TbCurrencyTaka /> (Monthly)
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <p className="mb-8">
          * Confirm all information is correct before submitting.
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJobHolder;
