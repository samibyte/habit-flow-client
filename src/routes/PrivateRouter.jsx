import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import PageLoader from "../components/ui/PageLoader";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const lastToastPath = useRef(null);

  useEffect(() => {
    if (!loading && !user && lastToastPath.current !== location.pathname) {
      const msg =
        location.pathname === "/dashboard/my-habits"
          ? "Please login to view your habits"
          : location.pathname === "/dashboard/add-habits"
            ? "Please login to add habits"
            : location.pathname === "/dashboard"
              ? "Please login to view analytics"
              : "Please login first";

      toast.error(msg, {
        position: "top-right",
      });
      lastToastPath.current = location.pathname;
    }
  }, [user, loading, location.pathname]);

  if (loading) return <PageLoader />;

  if (user && user.email) return children;

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRouter;
