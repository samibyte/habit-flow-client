import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
  User,
  LogOut,
  TrendingUp,
  ChartNoAxesCombined,
  ChevronDown,
} from "lucide-react";

const ProfileDropDown = (props) => {
  const { user, loading, signOutUser } = useAuth();
  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [
    // {
    //   title: "My Profile",
    //   path: "#",
    //   icon: User,
    //   description: "View your profile",
    // },
    {
      title: "My Habits",
      path: "/dashboard/my-habits",
      icon: TrendingUp,
      description: "View progress dashboard",
    },
    {
      title: "Progress Analytics",
      path: "/dashboard",
      icon: ChartNoAxesCombined,
      description: "View progress dashboard",
    },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setState(false);
    };
    document.addEventListener("click", handleDropDown);
    return () => document.removeEventListener("click", handleDropDown);
  }, []);

  const handleLogOut = async () => {
    await signOutUser();
    toast.success("Signed out successfully");
    setState(false);
  };

  if (loading) {
    return (
      <div className="w-36 h-9 rounded-2xl bg-base-300 animate-pulse"></div>
    );
  }

  return (
    <div className={`relative ${props.class}`}>
      {/* Profile button */}
      <button
        ref={profileRef}
        className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-base-200 hover:bg-base-300 transition-all duration-300 group"
        onClick={() => setState(!state)}
      >
        <div className="relative">
          <img
            src={
              user?.photoURL ||
              `https://avatar.iran.liara.run/username?username=${user.displayName}+`
            }
            alt={user?.displayName || "User"}
            className="w-9 h-9 rounded-full border-2 border-primary/20 object-cover transition-all duration-300 group-hover:border-primary/40"
          />
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
        </div>

        <div className="hidden md:flex items-center gap-1.5">
          <div className="text-left">
            <p className="text-sm font-semibold text-base-content leading-tight max-w-[120px] truncate">
              {user?.displayName?.split(" ")[0] || "User"}
            </p>
            <p className="text-xs text-base-content/60 leading-tight">
              {user?.email?.split("@")[0]}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-base-content/60 transition-transform duration-300 ${state ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-72 bg-base-100 border border-base-300 rounded-2xl shadow-2xl backdrop-blur-sm z-50 transition-all duration-300 origin-top-right ${
          state
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header with User Info */}
        <div className="p-4 border-b border-base-300/50">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.photoURL ||
                `https://avatar.iran.liara.run/username?username=${user.displayName}+`
              }
              alt={user?.displayName || "User"}
              className="w-12 h-12 rounded-xl border-2 border-primary/20 object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base-content truncate">
                {user?.displayName || "Anonymous User"}
              </h3>
              <p className="text-sm text-base-content/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-2">
          {navigation.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setState(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-base-content hover:bg-base-200 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-base-content/60">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Log Out Button */}
        <div className="p-3 border-t border-base-300/50">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-error hover:bg-error/10 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error/20 transition-all duration-300">
              <LogOut className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Sign Out</p>
              <p className="text-xs text-error/60">End your session</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-base-200/50 rounded-b-2xl">
          <div className="flex items-center justify-between text-xs text-base-content/60">
            <span>HabitFlow Pro</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
