import { setBlogs, setLoading } from "@/redux/blogSlice";
import { BLOG_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllBlogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BLOG_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("called");
        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBlogs();
  }, []);
};

export default useGetAllBlogs;
