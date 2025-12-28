import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";

const GoogleLoginbtn = () => {
  const axiosSecure = useAxios();
  const { signInGoogle } = useAuth();
  const locations = useLocation();
  const navigate = useNavigate();

  const handleWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        // console.log(result.user);

        //create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          if (res.data) {
            navigate(locations.state || "/");
            // alert("user created successfully");
            // console.log("user created successfully", res.data);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        className="btn bg-[#CAEB66] hover:bg-[#89a72c]"
        onClick={handleWithGoogle}
      >
        <p>Login</p>
      </button>
    </div>
  );
};

export default GoogleLoginbtn;
