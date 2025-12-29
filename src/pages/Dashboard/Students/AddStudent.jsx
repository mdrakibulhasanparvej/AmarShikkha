import { useForm } from "react-hook-form";

const AddStudent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const studentAdmisionInfo = {
      entryId: "",
      studentInfo: {
        name: data.name,
        birthDate: data.birthDate,
        phone: data.studentPhone,
        email: data.email,
        sex: data.sex,
      },
      parentInfo: {
        fathersName: data.fathersName,
        fathersOccupation: data.fathersOccupation,
        fathersPhone: data.fathersPhone,
        mothersName: data.mothersName,
        mothersOccupation: data.mothersOccupation,
        mothersPhone: data.mothersPhone,
      },
      guardianInfo: {
        name: data.guardianName,
        relation: data.guardianRelation,
        phone: data.guardianPhone,
        address: data.guardianAddress,
      },
      familyInfo: {
        income: data.income,
        totalMembers: data.totalMembers,
      },
      address: {
        present: data.presentAddress,
        permanent: data.permanentAddress,
      },
      educationInfo: {
        qualification: data.qualification,
        passingYear: data.passingYear,
        result: data.result,
      },
      tradeInfo: {
        tradeName: data.tradeName,
        batchNumber: data.batchNumber,
      },
      status: "pending",
      remarks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(studentAdmisionInfo);
    reset();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">Add Student Admission</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 bg-white dark:bg-gray-800 border border-gray-200 p-4 rounded-xl"
      >
        {/* ================= Student Info ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl">
          <h3 className="col-span-2 font-semibold text-lg ">
            Student Information
          </h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Student Name</legend>
            <input
              {...register("name", { required: "Student name is required" })}
              className="input input-bordered"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Birth Date</legend>
            <input
              type="date"
              {...register("birthDate", { required: "Birth date is required" })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Student Phone</legend>
            <input
              {...register("studentPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(01)[0-9]{9}$/,
                  message: "Invalid Bangladeshi phone number",
                },
              })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Student Email</legend>
            <input
              {...register("email", { required: "Email is required" })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Sex</legend>
            <select
              {...register("sex", { required: "Sex is required" })}
              className="select select-bordered"
            >
              <option value="">Select Sex</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </fieldset>
        </div>

        {/* ================= Parent Info ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl">
          <h3 className="col-span-2 font-semibold text-lg">
            Parent Information
          </h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Father's Name</legend>
            <input
              {...register("fathersName", { required: "Required" })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Father's Occupation</legend>
            <input
              {...register("fathersOccupation")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Father's Phone</legend>
            <input
              {...register("fathersPhone", { required: "Required" })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mother's Name</legend>
            <input
              {...register("mothersName")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mother's Occupation</legend>
            <input
              {...register("mothersOccupation")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mother's Phone</legend>
            <input
              {...register("mothersPhone")}
              className="input input-bordered"
            />
          </fieldset>
        </div>

        {/* ================= Guardian Info ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl bg-white4">
          <h3 className="col-span-2 font-semibold text-lg">
            Guardian Information
          </h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Guardian Name</legend>
            <input
              {...register("guardianName")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Relation</legend>
            <input
              {...register("guardianRelation")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Guardian Phone</legend>
            <input
              {...register("guardianPhone")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Guardian Address</legend>
            <input
              {...register("guardianAddress")}
              className="input input-bordered"
            />
          </fieldset>
        </div>

        {/* ================= Family Info ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl bg-white4">
          <h3 className="col-span-2 font-semibold text-lg">
            Family Information
          </h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Monthly Income</legend>
            <input
              type="number"
              {...register("income")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Total Members</legend>
            <input
              type="number"
              {...register("totalMembers")}
              className="input input-bordered"
            />
          </fieldset>
        </div>

        {/* ================= Address ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl bg-white4">
          <h3 className="col-span-2 font-semibold text-lg">Address</h3>

          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Present Address</legend>
            <input
              {...register("presentAddress", { required: true })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Permanent Address</legend>
            <input
              {...register("permanentAddress")}
              className="input input-bordered"
            />
          </fieldset>
        </div>

        {/* ================= Education ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl bg-white4">
          <h3 className="col-span-2 font-semibold text-lg">Education</h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Qualification</legend>
            <input
              {...register("qualification")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Passing Year</legend>
            <input
              {...register("passingYear")}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Result</legend>
            <input {...register("result")} className="input input-bordered" />
          </fieldset>
        </div>

        {/* ================= Trade ================= */}
        <div className="grid grid-cols-2 gap-5 col-span-2 border border-gray-200 p-4 rounded-xl bg-white4">
          <h3 className="col-span-2 font-semibold text-lg">
            Trade Information
          </h3>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Trade Name</legend>
            <input
              {...register("tradeName", { required: true })}
              className="input input-bordered"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Batch Number</legend>
            <input
              {...register("batchNumber", { required: true })}
              className="input input-bordered"
            />
          </fieldset>
        </div>

        {/* ================= Submit ================= */}
        <button type="submit" className="btn btn-primary col-span-2 mt-6">
          Submit Admission
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
