import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, logOut } from "../features/auth/authSlice";
import Cookies from "js-cookie";

// eslint-disable-next-line no-unused-vars
const productionUrl = "https://insignia-backend.vercel.app/api/v1";
// eslint-disable-next-line no-unused-vars
const developmentUrl = "http://localhost:8080/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: developmentUrl,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const token = Cookies.get("rT");

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send the refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: "/auth/admin/refresh/token", method: "POST", body: { token } },
      api,
      extraOptions
    );

    if (refreshResult?.data?.statusCode === 200) {
      // store the new token
      api.dispatch(setAuth(refreshResult?.data?.data));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      Cookies.remove("rT");
      api.dispatch(logOut());
    }
  }
  if (result?.error?.status === 401) {
    Cookies.remove("rT");
    api.dispatch(logOut());
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "config",
    "faq",
    "video",
    "question",
    "review",
    "photo",
    "admin",
    "user",
  ],
  endpoints: () => ({}),
});
