import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AuthLayout from "../layout/AuthLayout";

import Home from "../pages/Home/Home";
import OverView from "../pages/Dashboard/overview/OverView";

import AddJobHolder from "../pages/Dashboard/JobHolder/AddJobHolder";
import AllJobholders from "../pages/Dashboard/JobHolder/AllJobholders";
import DownloadPDF from "../pages/Dashboard/JobHolder/DownloadPDF";

import AddWorkplace from "../pages/Dashboard/workplace/AddWorkplace";
import AllWorkplace from "../pages/Dashboard/workplace/AllWorkplace";

import AllSliderImage from "../pages/Home/Swiper/AllSliderImage";
import AddBannerSlider from "../pages/Home/Swiper/AddBannerSlider";

import AllActivities from "../pages/Home/Activity/AllActivities";
import AddActivites from "../pages/Home/Activity/AddActivites";

import AllNewsGallery from "../pages/Home/NewsGallery/AllNewsGallery";
import AddNews from "../pages/Home/NewsGallery/AddNews";

import AllImageGallery from "../pages/Home/PhotoGallery/AllImageGallery";
import AddImage from "../pages/Home/PhotoGallery/AddImage";

import AllStudents from "../pages/Dashboard/Students/AllStudents";
import AddStudent from "../pages/Dashboard/Students/AddStudent";

import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

import PrivateRoutes from "./PrivateRoutes";
import Statistics from "../pages/Dashboard/common/Statistics";
import Profile from "../pages/Dashboard/common/Profile";
import Allusers from "../pages/Dashboard/Students/AllUser/Allusers";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ FIX
    children: [
      {
        index: true,
        element: <Home />, // ✅ FIX
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "all-banner", element: <AllSliderImage /> },
      { path: "add-banner-slider", element: <AddBannerSlider /> },
      { path: "all-activites", element: <AllActivities /> },
      { path: "add-activites", element: <AddActivites /> },
      { path: "all-news-gallery", element: <AllNewsGallery /> },
      { path: "add-news", element: <AddNews /> },
      { path: "all-image-gallery", element: <AllImageGallery /> },
      { path: "add-image", element: <AddImage /> },
      { path: "admission-request", element: <AllStudents /> },
      { path: "create-admision-request", element: <AddStudent /> },
      { path: "add-job-holder", element: <AddJobHolder /> },
      { path: "all-job-holder", element: <AllJobholders /> },
      { path: "downloadPDF", element: <DownloadPDF /> },
      { path: "add-workplace", element: <AddWorkplace /> },
      { path: "all-workplace", element: <AllWorkplace /> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />, // ✅ FIX
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
