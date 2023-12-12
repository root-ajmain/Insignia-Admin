import { api } from "../../api/apiSlice";

const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestion: builder.query({
      query: ({ page, limit, searchTerm, isRead }) => {
        let url = `/question`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (isRead !== "") {
          url += `&isRead=${isRead}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["question"],
    }),
    deleteOneQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["question"],
    }),
    deleteManyQuestion: builder.mutation({
      query: ({ data }) => ({
        url: `/question/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["question"],
    }),
    updateReadCount: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["question"],
    }),
  }),
});

export const {
  useGetAllQuestionQuery,
  useDeleteOneQuestionMutation,
  useDeleteManyQuestionMutation,
  useUpdateReadCountMutation
} = questionApi;
