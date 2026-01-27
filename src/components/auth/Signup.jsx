import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { DotLottiePlayer } from "@dotlottie/react-player";
import signupLottie from "@/assets/register.json";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* FORM SECTION */}
          <div className="p-8 md:p-10">
            <h1 className="text-2xl font-bold mb-1 text-center">
              Create Account{" "}
            </h1>
            <p className="text-gray-500 mb-6 text-center">
              Sign up to start applying and hiring smarter
            </p>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                />
              </div>

              <div className="">
                <p className="text-sm font-medium">Select your role</p>

                <RadioGroup className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                    />
                    <span className="text-sm text-gray-700">Student</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                    />
                    <span className="text-sm text-gray-700">Recruiter</span>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label>Profile Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>

              <Button
                className="w-full mt-4 cursor-pointer bg-[#6A38C2] hover:bg-[#5b30a6]"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-sm text-center mt-3 flex items-center justify-between flex-col gap-2">
                <div>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#6A38C2] font-medium hover:underline"
                  >
                    Login
                  </Link>
                </div>
                <div>
                  <Link
                    to="/"
                    className="text-[#6A38C2] font-medium hover:underline"
                  >
                    Continue as guest
                  </Link>
                </div>
              </p>
            </form>
          </div>

          {/* LOTTIE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-col justify-center p-10 bg-[#6A38C2] text-white"
          >
            <DotLottiePlayer
              src={signupLottie}
              autoplay
              loop
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
