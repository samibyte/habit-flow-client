import { Outlet } from "react-router";
import Navbar from "../components/blocks/Navbar";
import Footer from "../components/blocks/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
