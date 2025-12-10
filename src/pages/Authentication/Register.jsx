// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import useAxios from "../../hook/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    // console.log(data);

    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);

        const formData = new FormData();
        formData.append("image", profileImg);

        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_host}`;
        axios.post(imageAPIURL, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in the database

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created successfully");
            }
          });

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              // console.log("user updated");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // reset();
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   if (file.size > 2 * 1024 * 1024) {
  //     setError("File size exceeds 2MB!");
  //     setFileName(""); // Prevent upload
  //     return;
  //   }
  //   setError("");
  //   setFileName(file.name);
  // };

  return (
    <div className="card-body mx-auto w-96">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <p>Register with Amar shikkha</p>
      <form
        onSubmit={handleSubmit(handleRegistration)}
        encType="multipart/form-data"
      >
        <fieldset className="fieldset">
          <label className="label font-bold">Photo</label>
          <input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="file-input"
          />
          <label className="label font-bold">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
          <label className="label font-bold">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
          <label className="label font-bold">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="btn bg-[#CAEB66] hover:bg-[#89a72c] mt-4"
          >
            Register
          </button>
        </fieldset>
      </form>
      <div>
        {" "}
        <p>
          {" "}
          Already have an Account?{" "}
          <Link to="/login" className="link link-hover">
            {" "}
            Login{" "}
          </Link>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default Register;

// <div>
//   <fieldset className="fieldset flex items-center w-max">
//     <label
//       htmlFor="fileUpload"
//       className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer relative"
//     >
//       {/* User icon */}
//       <FaUserCircle className="text-gray-400 text-7xl" />

//       {/* Upload arrow */}
//       <FaArrowUp className="text-[#CAEB66] text-lg p-1 bg-gray-100 rounded-full absolute -bottom-1 -right-1" />
//     </label>

//     {/* Hidden file input */}
//     <input
//       id="fileUpload"
//       className="hidden"
//       type="file"
//       onChange={handleFileChange}
//     />

//     {/* Conditional rendering — show file name only when valid */}

//     {fileName && (
//       <label
//         className={`label ml-3 text-sm text-gray-500 ${
//           fileName ? "block" : "hidden"
//         }`}
//       >
//         {fileName}
//       </label>
//     )}
//   </fieldset>
//   <label
//     className={`label text-xs ${error ? "text-red-600 bg-red-100 p-1 rounded" : " text-gray-500"}`}
//   >
//     {error ? error : "Max size 2MB"}
//   </label>
// </div>
