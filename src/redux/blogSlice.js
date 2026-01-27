import { createSlice } from "@reduxjs/toolkit";



const blogSlice = createSlice({
    name: "blog",
    initialState: {
        loading: false,
        blogs: []
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        }
    }
});

export const { setLoading, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
