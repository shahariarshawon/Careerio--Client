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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import loginAnimation from "../../assets/Login.json";
import { DotLottiePlayer } from "@dotlottie/react-player";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl"
        >
          {/* LEFT BRAND / INFO */}
          <div className="hidden md:flex flex-col justify-center p-10 bg-[#6A38C2] text-white">
            <DotLottiePlayer
              src={loginAnimation}
              loop
              autoplay
              className="w-full h-full"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mb-6 text-center">
              Sign in to your account to continue
            </p>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
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
                <p className="text-sm font-medium ">Login as</p>

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

              <Button
                type="submit"
                className="w-full mt-4 bg-[#6A38C2] hover:bg-[#5b30a6]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6 flex items-center justify-between flex-col gap-2">
              <div>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#6A38C2] font-medium hover:underline"
                >
                  Sign up
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
