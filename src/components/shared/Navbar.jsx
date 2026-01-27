import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // mobile menu state
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* LEFT: NAV LINKS */}
        <div className="hidden md:flex items-center">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="relative text-gray-700 hover:text-[#6A38C2] transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
               after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300
               hover:after:w-full"
                  >
                    Blogs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {/* MOBILE NAV MENU */}
        {open && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <ul className="flex flex-col gap-4 px-6 py-4 font-medium">
              {!user || user.role !== "recruiter" ? (
                <>
                  <Link to="/" onClick={() => setOpen(false)}>
                    Home
                  </Link>
                  <Link to="/jobs" onClick={() => setOpen(false)}>
                    Jobs
                  </Link>
                  <Link to="/browse" onClick={() => setOpen(false)}>
                    Browse
                  </Link>
                  <Link to="/blogs" onClick={() => setOpen(false)}>
                    Blogs
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/admin/companies" onClick={() => setOpen(false)}>
                    Companies
                  </Link>
                  <Link to="/admin/jobs" onClick={() => setOpen(false)}>
                    Jobs
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}

        {/* CENTER: BRAND */}
        <div>
          <Link to="/">
            <h1
              className="flex text-2xl font-semibold tracking-[0.3em]"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {"CAREER".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-drop"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {char}
                </span>
              ))}
              <span className="text-[#F83002] ml-2 animate-drop">.IO</span>
            </h1>
          </Link>
        </div>

        {/* RIGHT: AUTH / USER */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="hidden md:block bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar
                  className={`cursor-pointer border-2 border-green-400 w-12 h-12 rounded-full hover:scale-110 transition-all duration-300 hover: ${user?.profile?.profilePhoto ? "" : "border-green-400"}`}
                >
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-2 items-center mb-3">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 border-2 border-green-400 p-1 rounded-full"
                      src={user?.profile?.profilePhoto}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                      {user?.role === "student" ? "Student" : "Recruiter"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 size={18} />
                      <Link to="/profile" className="text-sm">
                        View Profile
                      </Link>
                    </div>
                  )}

                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 cursor-pointer mt-2"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
