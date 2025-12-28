import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useWorkplacesWithAutoAddress } from "../../hook/useWorkplacesWithAutoAddress";

const UpdateModal = ({
  selected,
  setOpenUpdate,
  jobholders,
  setJobholders,
  axiosSecure,
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: selected || {},
  });

  const watchFields = watch();
  const addressTouchedRef = useRef(false);

  const { workplaceNames, getAddressByWorkplace } =
    useWorkplacesWithAutoAddress();

  // Sync selected data
  useEffect(() => {
    if (selected) reset(selected);
  }, [selected, reset]);

  // Auto-fill address (safe)
  useEffect(() => {
    if (!watchFields.workplace) return;

    const address = getAddressByWorkplace(watchFields.workplace);
    if (address && !addressTouchedRef.current) {
      setValue("address", address, { shouldDirty: false });
    }
  }, [watchFields.workplace]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/jobholder/${selected._id}`, data);

      if (res.data.success) {
        const updated = jobholders.map((j) =>
          j._id === selected._id ? { ...j, ...data } : j
        );
        setJobholders(updated);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false,
        });

        setOpenUpdate(false);
      }
    } catch {
      Swal.fire("Error", "Failed to update Job Holder", "error");
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-4xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Update Jobholder
        </h3>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={selected.photo_URL}
              alt={selected.name}
              className="w-full max-w-xs object-contain rounded-lg border"
            />
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-2/3 space-y-4 text-base"
          >
            <div>
              <label className="label font-medium">Name</label>
              <input
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label className="label font-medium">Trade</label>
              <select
                className="select select-bordered w-full"
                {...register("trade", { required: true })}
              >
                <option>Electrical House Wiring</option>
                <option>Industrial Electrical Wiring</option>
                <option>Industrial Sewing</option>
                <option>Dressmaking & Tailoring</option>
                <option>Garments Machine Mechanics</option>
                <option>Com. Freelancing & sopken Eng.</option>
                <option>Computer</option>
                <option>Motorbike Mechanics</option>
                <option>Spoken English</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Designation</label>
              <input
                className="input input-bordered w-full"
                {...register("designation", { required: true })}
              />
            </div>

            <div>
              <label className="label font-medium">Workplace</label>
              <select
                className="select select-bordered w-full"
                {...register("workplace")}
              >
                <option value="">Select Workplace</option>
                {workplaceNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-medium">Address</label>
              <input
                {...register("address", {
                  onChange: () => (addressTouchedRef.current = true),
                })}
                className="input input-bordered w-full"
                placeholder="Edit address if needed"
              />
            </div>

            <div>
              <label className="label font-medium">Salary</label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("salary", { required: true })}
              />
            </div>

            <div>
              <label className="label font-medium">Donner</label>
              <select
                className="select select-bordered w-full"
                {...register("donner", { required: true })}
              >
                <option>GSRD</option>
                <option>PLANET</option>
              </select>
            </div>

            <div className="modal-action mt-6">
              <button type="submit" className="btn btn-success text-white">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setOpenUpdate(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateModal;
