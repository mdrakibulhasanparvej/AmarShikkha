import React from "react";
import { Outlet } from "react-router";
import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
