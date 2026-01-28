const RAW_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${RAW_BACKEND_URL}/api`;

if (!BASE_URL) {
  console.error(
    "VITE_BACKEND_URL is NOT defined. Check Vercel Environment Variables."
  );
}

// API Endpoints
export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
export const BLOG_API_END_POINT = `${BASE_URL}/blogs`;
export const NEWSLETTER_API_END_POINT = `${BASE_URL}/newsletter`;

console.log("BASE_URLLL:", BASE_URL);
