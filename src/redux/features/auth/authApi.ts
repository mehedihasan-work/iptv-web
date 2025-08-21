import { baseApi } from "../../createdApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserInfo: builder.query({
      query: (userInfo) => {
        return {
          url: "/user-info",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchMovies: builder.query({
      query: (userInfo) => {
        return {
          url: "/movies",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchMovieInfo: builder.query({
      query: (userInfo) => {
        return {
          url: "/movie-info",
          method: "GET",
          params: userInfo,
        };
      },
    }),
    fetchMovieCategories: builder.query({
      query: (userInfo) => {
        return {
          url: "/movie-categories",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchSeries: builder.query({
      query: (userInfo) => {
        return {
          url: "/series",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchSeriesCategories: builder.query({
      query: (userInfo) => {
        return {
          url: "/series-categories",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchSeriesInfo: builder.query({
      query: (userInfo) => {
        return {
          url: "/series-info",
          method: "GET",
          params: userInfo,
        };
      },
    }),
    fetchLiveCategories: builder.query({
      query: (userInfo) => {
        return {
          url: "/live-categories",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
    fetchLiveStreams: builder.query({
      query: (userInfo) => {
        return {
          url: "/live-streams",
          method: "GET",
          params: {
            ...userInfo,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchUserInfoQuery,
  useLazyFetchUserInfoQuery,
  useFetchMoviesQuery,
  useFetchMovieInfoQuery,
  useFetchMovieCategoriesQuery,
  useFetchSeriesQuery,
  useFetchSeriesCategoriesQuery,
  useFetchLiveCategoriesQuery,
  useFetchLiveStreamsQuery,
  useFetchSeriesInfoQuery,
} = authApi;
