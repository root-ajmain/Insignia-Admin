import { api } from "../../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/create/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    getAdminList: builder.query({
      query: ({ page, limit, searchTerm, role }) => {
        let url = `/admin`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (role !== "") {
          url += `&role=${role}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    deleteOneAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    deleteManyAdmin: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAdminListQuery,
  useCreateAdminMutation,
  useDeleteOneAdminMutation,
  useDeleteManyAdminMutation,
} = adminApi;
