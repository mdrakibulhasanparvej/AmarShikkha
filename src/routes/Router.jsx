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
