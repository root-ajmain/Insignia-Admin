import { api } from "../../api/apiSlice";

const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addVideo: builder.mutation({
      query: ({ data }) => ({
        url: "/video/add/video",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    updateOneVideo: builder.mutation({
      query: ({ data }) => ({
        url: `/video/update-one`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    getAllVideo: builder.query({
      query: ({ page, limit, searchTerm, isSelected }) => {
        let url = `/video`;
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
      providesTags: ["video"],
    }),
    deleteOneVideo: builder.mutation({
      query: (id) => ({
        url: `/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video"],
    }),
    updateVideoVisibility: builder.mutation({
      query: (id) => ({
        url: `/video/update-visibility/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["video"],
    }),
    deleteManyVideo: builder.mutation({
      query: ({ data }) => ({
        url: `/video/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
  }),
});

export const {
  useAddVideoMutation,
  useUpdateOneVideoMutation,
  useGetAllVideoQuery,
  useUpdateVideoVisibilityMutation,
  useDeleteOneVideoMutation,
  useDeleteManyVideoMutation
} = videoApi;
