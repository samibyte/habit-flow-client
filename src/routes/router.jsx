import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import MyHabits from "../pages/MyHabits/MyHabits";
import AddHabit from "../pages/AddHabit/AddHabit";
import HabitDetails from "../pages/HabitDetails/HabitDetails";
import BrowseHabits from "../pages/BrowseHabits/BrowseHabits";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AnalyticsDashboard from "../pages/AnalyticsDashboard/AnalyticsDashboard";
import AboutUs from "../pages/AboutUs/AboutUs";
import { Dashboard } from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/habits",
        element: <BrowseHabits />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/habit-details/:id",
        element: (
            <HabitDetails />
        ),
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <AnalyticsDashboard />,
      },
      {
        path: "my-habits",
        element: <MyHabits />,
      },
      {
        path: "add-habits",
        element: <AddHabit />,
      }
    ],
  },
]);

export default router;
