import { api } from "../../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerList: builder.query({
      query: ({ page, limit, searchTerm, blockStatus }) => {
        let url = `/user`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (blockStatus !== "") {
          url += `&blockStatus=${blockStatus}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getOneCustomer: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteOneCustomer: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    deleteManyCustomer: builder.mutation({
      query: ({ data }) => ({
        url: `/user/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateBlockStatus: builder.mutation({
      query: (id) => ({
        url: `/user/update-block-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetCustomerListQuery,
  useGetOneCustomerQuery,
  useDeleteOneCustomerMutation,
  useDeleteManyCustomerMutation,
  useUpdateBlockStatusMutation,
  useUpdateUserMutation,
} = adminApi;
