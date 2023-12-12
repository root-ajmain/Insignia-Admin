import { api } from "../../api/apiSlice";

const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: ({ data }) => ({
        url: "/faq/create/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    getFaq: builder.query({
      query: ({ page, limit, searchTerm, isSelected }) => {
        let url = `/faq`;
        url += `?page=${page}&limit=${limit}`;
        if (searchTerm !== "") {
          url += `&searchTerm=${searchTerm}`;
        }
        if (isSelected !== "") {
          url += `&isSelected=${isSelected}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["faq"],
    }),
    getOneFaq: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
    }),
    deleteOneFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
    updateVisibility: builder.mutation({
      query: (id) => ({
        url: `/faq/update-visibility/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["faq"],
    }),
    updateOneFaq: builder.mutation({
      query: ({ data }) => ({
        url: `/faq/update-one`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteManyFaq: builder.mutation({
      query: ({ data }) => ({
        url: `/faq/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetFaqQuery,
  useGetOneFaqQuery,
  useDeleteOneFaqMutation,
  useUpdateOneFaqMutation,
  useUpdateVisibilityMutation,
  useDeleteManyFaqMutation,
} = faqApi;
