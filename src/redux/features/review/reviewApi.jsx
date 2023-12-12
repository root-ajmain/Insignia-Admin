import { api } from "../../api/apiSlice";

const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: ({ page, limit, searchTerm, isRead, isSelected }) => {
        let url = `/review`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (isRead !== "") {
          url += `&isRead=${isRead}`;
        }
        if (isSelected !== "") {
          url += `&isSelected=${isSelected}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    deleteOneReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    deleteManyReview: builder.mutation({
      query: ({ data }) => ({
        url: `/review/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    updateReviewVisibility: builder.mutation({
      query: (id) => ({
        url: `/review/update-visibility/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["review"],
    }),
    updateReviewReadCount: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useUpdateReviewReadCountMutation,
  useUpdateReviewVisibilityMutation,
  useDeleteOneReviewMutation,
  useDeleteManyReviewMutation,
} = questionApi;
