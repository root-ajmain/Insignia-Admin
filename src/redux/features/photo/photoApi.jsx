import { api } from "../../api/apiSlice";

const photoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPhoto: builder.query({
      query: ({ page, limit, searchTerm, isSelected }) => {
        let url = `/photo`;
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
      providesTags: ["photo"],
    }),
    addPhoto: builder.mutation({
      query: ({ data }) => ({
        url: "/photo/add/photo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    deleteOnePhoto: builder.mutation({
      query: (id) => ({
        url: `/photo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photo"],
    }),
    deleteManyPhoto: builder.mutation({
      query: ({ data }) => ({
        url: `/photo/delete-many`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    updatePhotoVisibility: builder.mutation({
      query: (id) => ({
        url: `/photo/update-visibility/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["photo"],
    }),
  }),
});

export const {
  useGetAllPhotoQuery,
  useAddPhotoMutation,
  useDeleteOnePhotoMutation,
  useDeleteManyPhotoMutation,
  useUpdatePhotoVisibilityMutation
} = photoApi;
