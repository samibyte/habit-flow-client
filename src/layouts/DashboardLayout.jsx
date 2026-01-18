import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {
  HiChartPie,
  HiViewBoards,
  HiPlus,
  HiLogout,
  HiHome
} from "react-icons/hi";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import {motion} from "motion/react";
import ProfileDropDown from "../components/ui/ProfileDropDown";
import ThemeSwitch from "../components/ui/ThemeSwitch";
import { useState } from "react";

export function Dashboard() {
  const { signOutUser } = useAuth();

  const [state, setState] = useState(false);

  return (

    <div className="flex">
      {/* Sidebar */}
      <div className="fixed flex">
        <Sidebar
          className={`
            fixed h-screen z-40
            transition-transform duration-300 -translate-x-full
            md:translate-x-0 md:static md:block
          `}
        >
          <SidebarLogo href="/" img="/ht.png">
            HabitFlow
          </SidebarLogo>

          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href="/" icon={HiHome}>
                Home
              </SidebarItem>
              <SidebarItem href="/dashboard" icon={HiChartPie}>
                Analytics
              </SidebarItem>

              <SidebarItem href="/dashboard/my-habits" icon={HiViewBoards}>
                My Habits
              </SidebarItem>
              <SidebarItem href="/dashboard/add-habits" icon={HiPlus}>
                Add Habits
              </SidebarItem>
              <SidebarItem onClick={() => {signOutUser()}} icon={HiLogout}>
                Logout
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
        
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-base-100"
        >
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end py-5">

              {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  <ThemeSwitch />
                  <ProfileDropDown />
                </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-3">
                <ThemeSwitch />
                <button
                  onClick={() => setState(!state)}
                  className="relative z-50 p-2 rounded-xl hover:bg-base-200 transition-colors"
                  aria-label="Toggle menu"
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <motion.span
                      animate={state ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                      className="w-full h-0.5 bg-base-content rounded-full"
                    />
                    <motion.span
                      animate={state ? { opacity: 0 } : { opacity: 1 }}
                      className="w-full h-0.5 bg-base-content rounded-full"
                    />
                    <motion.span
                      animate={state ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      className="w-full h-0.5 bg-base-content rounded-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
        <Outlet />
      </div>
    </div>
  );
}
