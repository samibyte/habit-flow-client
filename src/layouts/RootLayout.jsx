import { Outlet } from "react-router";
import Navbar from "../components/blocks/Navbar";
import Footer from "../components/blocks/Footer";

const RootLayout = () => {
  return (
    <div>
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
