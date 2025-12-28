import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../layout/Dashboard";
import AddJobHolder from "../pages/JobHolder/AddJobHolder";
import Home from "../pages/Home/Home";
import OverView from "../pages/overview/OverView";
import AddWorkplace from "../pages/workplace/AddWorkplace";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import AllJobholders from "../pages/JobHolder/AllJobholders";
import DownloadPDF from "../pages/JobHolder/DownloadPDF";
import AllWorkplace from "../pages/workplace/AllWorkplace";
import AllSliderImage from "../pages/Home/Swiper/AllSliderImage";
import AddBannerSlider from "../pages/Home/Swiper/AddBannerSlider";
import AllActivities from "../pages/Home/Activity/AllActivities";
import AddActivites from "../pages/Home/Activity/AddActivites";
import AllNewsGallery from "../pages/Home/NewsGallery/AllNewsGallery";
import AddNews from "../pages/Home/NewsGallery/AddNews";
import AllImageGallery from "../pages/Home/PhotoGallery/AllImageGallery";
import AddImage from "../pages/Home/PhotoGallery/AddImage";
import AllStudents from "../pages/Students/AllStudents";
import AddStudent from "../pages/Students/AddStudent";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "overview",
        Component: OverView,
      },
      {
        path: "all-banner",
        Component: AllSliderImage,
      },
      {
        path: "add-banner-slider",
        Component: AddBannerSlider,
      },
      {
        path: "all-activites",
        Component: AllActivities,
      },
      {
        path: "add-activites",
        Component: AddActivites,
      },
      {
        path: "all-news-gallery",
        Component: AllNewsGallery,
      },
      {
        path: "add-news",
        Component: AddNews,
      },
      {
        path: "all-Image-gallery",
        Component: AllImageGallery,
      },
      {
        path: "add-Image",
        Component: AddImage,
      },
      {
        path: "all-students",
        Component: AllStudents,
      },
      {
        path: "add-student",
        Component: AddStudent,
      },
      {
        path: "add-job-holder",
        Component: AddJobHolder,
      },
      {
        path: "all-job-holder",
        Component: AllJobholders,
      },
      {
        path: "downloadPDF",
        Component: DownloadPDF,
      },
      {
        path: "add-workplace",
        Component: AddWorkplace,
      },
      {
        path: "all-workplace",
        Component: AllWorkplace,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export default router;
