import { Outlet } from "react-router";
import Navbar from "../components/blocks/Navbar";
import Footer from "../components/blocks/Footer";
import ScrollToTop from "../components/ScrollToTop";
import DisplayRealTime from "../components/ui/displayRealTime";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const { user } = useAuth();

  return (
    <div>
      <ScrollToTop />
      <header>
        <Navbar />
        {user && (
          <div className="hidden 2xl:block fixed top-6 right-10 z-50">
            <DisplayRealTime />
          </div>
        )}
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
