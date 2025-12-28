import React from "react";
import { Outlet } from "react-router";
import Navbar from "../component/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
