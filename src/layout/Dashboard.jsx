import React from "react";
import { Outlet } from "react-router";
import { GoSidebarCollapse } from "react-icons/go";
import { TiHomeOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { SiWorkplace } from "react-icons/si";
import MyLinks from "../component/MyLinks";
import AccordionItem from "../component/AccordionItem/AccordionItem";

const Dashboard = () => {
  return (
    <div className="drawer bg-gray-100 mx-auto p-5 lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content ml-3">
        {/* Navbar */}
        <nav className="navbar w-full bg-white shadow-sm rounded-xl ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <GoSidebarCollapse className="my-1.5 inline-block size-4" />
          </label>
          <div className="px-4 font-semibold">GrameenShikkha</div>
        </nav>

        {/* Page content */}
        <div className="my-4 p-4 bg-white shadow-sm rounded-xl overflow-x-hidden">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-white shadow-sm rounded-xl is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div
          className="flex min-h-full flex-col items-start 
                bg-white shadow-sm rounded-xl
                is-drawer-close:w-14 is-drawer-open:w-64"
        >
          <ul className="menu w-full grow">
            <li>
              <MyLinks
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <TiHomeOutline className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </MyLinks>
            </li>
            <li>
              <MyLinks
                to="/dashboard/overview"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Over-View"
              >
                <MdDashboard className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Over view</span>
              </MyLinks>
            </li>

            {/* job holder */}
            <li>
              <div
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <FaBriefcase className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">
                  <AccordionItem title="Jobholders">
                    <li>
                      <MyLinks
                        to="/dashboard/add-job-holder"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Add-Job-Holder"
                      >
                        <span className="is-drawer-close:hidden">
                          Add Job Holder
                        </span>
                      </MyLinks>
                    </li>
                    <li>
                      <MyLinks
                        to="/dashboard/all-job-holder"
                        data-tip="All-Job-Holder"
                      >
                        <span>All Job Holder</span>
                      </MyLinks>
                    </li>
                  </AccordionItem>
                </span>
              </div>
            </li>

            {/* workplace */}
            <li>
              <div
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <SiWorkplace className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">
                  <AccordionItem title="Workplace">
                    <li>
                      <MyLinks
                        to="/dashboard/add-workplace"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Add workplace"
                      >
                        <span className="is-drawer-close:hidden">
                          Add Wrokplace
                        </span>
                      </MyLinks>
                    </li>
                    <li>
                      <MyLinks
                        to="/dashboard/all-workplace"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Add workplace"
                      >
                        <span className="is-drawer-close:hidden">
                          All Wrokplace
                        </span>
                      </MyLinks>
                    </li>
                  </AccordionItem>
                </span>
              </div>
            </li>

            <li>
              <MyLinks
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <IoSettingsOutline className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </MyLinks>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
