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
        path: "/habit-details/:id",
        element: (
            <HabitDetails />
        ),
      },
      {
        path: "/analytics",
        element: (
          <PrivateRouter>
            <AnalyticsDashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <PrivateRouter>
            <MyHabits />
          </PrivateRouter>
        ),
      },
      {
        path: "/add-habits",
        element: (
          <PrivateRouter>
            <AddHabit />
          </PrivateRouter>
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
]);

export default router;
