import React from "react";
import { Link } from "react-router";
import useAuth from "../../hook/useAuth";
import MyLinks from "./MyLinks";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLinks = [
    { label: "About Us", to: "/about" },
    { label: "Programs", to: "/programs" },
    { label: "Donors", to: "/donors" },
    { label: "Activities", to: "/activities" },
    { label: "News & Media", to: "/news" },
    { label: "Contact Us", to: "/contact" },
    { label: "Feedback", to: "/feedback" },
  ];

  const links = (
    <>
      {navLinks.map((item, index) => (
        <li key={index}>
          <MyLinks to={item.to}>{item.label}</MyLinks>
        </li>
      ))}

      {user && (
        <li>
          <MyLinks to="/dashboard">Dashboard</MyLinks>
        </li>
      )}
    </>
  );

  return (
    <>
      {/* 🔹 TOP HEADER */}
      <header className="w-full px-20 py-2 flex justify-between items-center">
        <img src="/grameen_shikkha_logo.gif" alt="logo" className="h-12" />

        {!user ? (
          <Link to="/auth/login" className="btn btn-sm">
            Login
          </Link>
        ) : (
          <button onClick={logOut} className="btn btn-sm">
            Logout
          </button>
        )}
      </header>

      {/* 🔹 MAIN NAVBAR */}
      <nav className="bg-[#06ba51] px-20">
        <div className="navbar py-0 min-h-0">
          {/* Mobile menu */}
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content py-0  mt-3 w-52 rounded-box bg-white text-black shadow z-50"
              >
                {links}
              </ul>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="navbar-center hidden py-0 lg:flex">
            <ul className="menu menu-horizontal gap-2 text-white">{links}</ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
