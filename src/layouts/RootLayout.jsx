import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DisplayRealTime from "../components/displayRealTime";
import ThemeSwitch from "../components/ui/ThemeSwitch";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default RootLayout;
