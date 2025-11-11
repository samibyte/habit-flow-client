import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import BrowseHabits from "../pages/BrowseHabits";
import MyHabits from "../pages/MyHabits";
import AddHabit from "../pages/AddHabit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "/my-habits",
        element: <MyHabits />,
      },
      {
        path: "/add-habits",
        element: <AddHabit />,
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
