import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const locations = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const handleLoign = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(locations?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  return (
    <div className="card-body mx-auto w-96">
      <h2 className="text-3xl font-bold">Welcome Back</h2>
      <p>Login with Amar Shikkha</p>
      <form onSubmit={handleSubmit(handleLoign)}>
        <fieldset className="fieldset">
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

          {/* Live Password strenght */}
          {password && (
            <p className="text-xs mt-1 text-gray-600">
              {password && !/[A-Z]/.test(password)
                ? "Must include at least one uppercase letter"
                : password && !/[a-z]/.test(password)
                  ? "Must include at least one lowercase letter"
                  : password && !/\d/.test(password)
                    ? "Must include at least one number"
                    : password && !/[@$!%*?&]/.test(password)
                      ? "Must include at least one special character"
                      : password && password.length < 6
                        ? "Password must be at least 8 characters"
                        : password
                          ? "Strong password"
                          : ""}
            </p>
          )}
          <div>
            <Link to="/forgetPassword" className="link link-hover">
              Forgot password?
            </Link>
          </div>
          {/* Disable login button when empty */}
          <button
            className="btn bg-[#CAEB66] hover:bg-[#89a72c] mt-4"
            disabled={!email || !password}
          >
            Login
          </button>

          <div className="flex flex-col items-start">
            <p>
              Don't have any account?{" "}
              <Link to="/auth/register" className="link link-hover">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
