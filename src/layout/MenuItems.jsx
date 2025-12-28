import React from "react";
import MyLinks from "../component/Navbar/MyLinks";
import { TiHomeOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard, MdDisplaySettings } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { SiWorkplace } from "react-icons/si";
import AccordionItem from "../component/AccordionItem/AccordionItem";
import { PiStudentBold } from "react-icons/pi";

const MenuItems = () => {
  return (
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

      {/* Student  admision*/}
      <li>
        <div
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Students"
        >
          <PiStudentBold className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">
            <AccordionItem title="Students">
              <li>
                <MyLinks
                  to="/dashboard/all-students"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Students"
                >
                  <span className="is-drawer-close:hidden">All Students</span>
                </MyLinks>
              </li>
              <li>
                <MyLinks to="/dashboard/add-student" data-tip="Add Student">
                  <span>Add Student</span>
                </MyLinks>
              </li>
            </AccordionItem>
          </span>
        </div>
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
                  <span className="is-drawer-close:hidden">Add Job Holder</span>
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
                  <span className="is-drawer-close:hidden">Add Wrokplace</span>
                </MyLinks>
              </li>
              <li>
                <MyLinks
                  to="/dashboard/all-workplace"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add workplace"
                >
                  <span className="is-drawer-close:hidden">All Wrokplace</span>
                </MyLinks>
              </li>
            </AccordionItem>
          </span>
        </div>
      </li>

      {/* Home Page items will go here */}
      <li>
        <div
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Home Setting"
        >
          <MdDisplaySettings className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">
            <AccordionItem title="Home Settings">
              {/* banner */}
              <h2 className="bg-gray-400 px-2 rounded-sm text-white">Banner</h2>
              <li>
                <MyLinks
                  to="/dashboard/all-banner"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All-Banner"
                >
                  <span className="is-drawer-close:hidden">
                    All Banner Slider
                  </span>
                </MyLinks>
              </li>
              <li>
                <MyLinks
                  to="/dashboard/add-banner-slider"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Banner Slider"
                >
                  <span className="is-drawer-close:hidden">
                    Add Banner Slider
                  </span>
                </MyLinks>
              </li>

              {/* Activites */}
              <h2 className="bg-gray-400 px-2 rounded-sm text-white">
                Activites
              </h2>
              <li>
                <MyLinks
                  to="/dashboard/all-activites"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All-activites"
                >
                  <span className="is-drawer-close:hidden">All Activites</span>
                </MyLinks>
              </li>
              <li>
                <MyLinks
                  to="/dashboard/add-activites"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Activites"
                >
                  <span className="is-drawer-close:hidden">Add Activites</span>
                </MyLinks>
              </li>
              {/* News gallery */}
              <h2 className="bg-gray-400 px-2 rounded-sm text-white">
                News Gallery
              </h2>
              <li>
                <MyLinks
                  to="/dashboard/all-news-gallery"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All-News-Gallery"
                >
                  <span className="is-drawer-close:hidden">All News</span>
                </MyLinks>
              </li>
              <li>
                <MyLinks
                  to="/dashboard/add-news"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add News"
                >
                  <span className="is-drawer-close:hidden">Add News</span>
                </MyLinks>
              </li>
              {/* Image gallery */}
              <h2 className="bg-gray-400 px-2 rounded-sm text-white">
                Image Gallery
              </h2>
              <li>
                <MyLinks
                  to="/dashboard/all-Image-gallery"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All-Image-Gallery"
                >
                  <span className="is-drawer-close:hidden">All Image</span>
                </MyLinks>
              </li>
              <li>
                <MyLinks
                  to="/dashboard/add-Image"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Image"
                >
                  <span className="is-drawer-close:hidden">Add Image</span>
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
  );
};

export default MenuItems;
