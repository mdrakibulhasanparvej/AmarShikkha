import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";

const AddWorkplace = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const axiosSecure = useAxios();
  const watchFields = watch();

  const onSubmit = (data) => {
    const workplaceInfo = {
      name: data.workplaceName,
      address: data.workplaceAddress,
      created_at: new Date(),
      created_by: "",
    };

    axiosSecure
      .post("/add-workplace", workplaceInfo)
      .then((res) => {
        if (res.data.insertedId || res.data.success) {
          toast.success("Workplace added successfully!", { autoClose: 2000 });
          reset();
        }
      })
      .catch((err) => {
        toast.error("Failed to add workplace. Try again.", { autoClose: 2000 });
        console.error("Error adding workplace:", err);
      });
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Workplace</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* LEFT SIDE - FORM INPUTS */}
          <fieldset className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md w-full">
            <legend className="text-xl font-bold px-4">Add Workplace</legend>

            {/* Workplace Name */}
            <div className="mb-4">
              <label className="label font-semibold">Workplace Name</label>
              <input
                type="text"
                {...register("workplaceName", {
                  required: "Workplace name is required",
                })}
                className="input input-bordered w-full"
                placeholder="e.g. Apex Garments Ltd."
              />
              {errors.workplaceName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.workplaceName.message}
                </p>
              )}
            </div>

            {/* Workplace Address */}
            <div className="mb-4">
              <label className="label font-semibold">Workplace Address</label>
              <input
                type="text"
                {...register("workplaceAddress", {
                  required: "Address is required",
                })}
                className="input input-bordered w-full"
                placeholder="e.g. Plot 12, Road 5, Sector 10, Uttara, Dhaka"
              />
              {errors.workplaceAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.workplaceAddress.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* RIGHT SIDE - LIVE PREVIEW */}
          <fieldset className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md w-full">
            <legend className="text-xl font-bold px-4">Live Preview</legend>

            <div className="  p-4">
              <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm p-4 max-w-sm mx-auto">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mt-2 text-gray-800">
                    {watchFields.workplaceName || "Workplace Name"}
                  </h3>
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Name</span>
                    <span>: {watchFields.workplaceName || "---"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Address</span>
                    <span>: {watchFields.workplaceAddress || "---"}</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active Workplace
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            * Please verify all details before submitting.
          </p>
          <button type="submit" className="btn btn-primary btn-lg">
            Add Workplace
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkplace;
