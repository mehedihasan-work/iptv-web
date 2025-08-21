import { createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  liveFavourites: any[];
  serieFavourites: any[];
  movieFavourites: any[];
  selectedLiveCategory?: string | null;
  selectedMovieCategory?: string | null;
  selectedSeriesCategory?: string | null;
}

const initialState: FavoritesState = {
  liveFavourites: [],
  serieFavourites: [],
  movieFavourites: [],
  selectedLiveCategory: null,
  selectedMovieCategory: null,
  selectedSeriesCategory: null,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleMovieFavourites: (state, action) => {
      const isMovieAdded = state.movieFavourites.find(
        (item) => item.stream_id === action.payload.stream_id
      );
      if (!isMovieAdded) {
        state.movieFavourites.push(action.payload);
      } else {
        const filteredMovies = state.movieFavourites.filter(
          (item) => item.stream_id !== action.payload.stream_id
        );
        state.movieFavourites = filteredMovies;
      }
    },
    toggleLiveFavourites: (state, action) => {
      const liveAdded = state.liveFavourites.find(
        (item) => item.stream_id === action.payload.stream_id
      );
      if (!liveAdded) {
        state.liveFavourites.push(action.payload);
      } else {
        const filteredMovies = state.liveFavourites.filter(
          (item) => item.stream_id !== action.payload.stream_id
        );
        state.liveFavourites = filteredMovies;
      }
    },
    toggleSeriesFavourites: (state, action) => {
      const liveAdded = state.serieFavourites.find(
        (item) => item.series_id === action.payload.series_id
      );
      if (!liveAdded) {
        state.serieFavourites.push(action.payload);
      } else {
        const filteredMovies = state.serieFavourites.filter(
          (item) => item.series_id !== action.payload.series_id
        );
        state.serieFavourites = filteredMovies;
      }
    },
    setSelectedMovieCategory: (state, action) => {
      if (state.selectedMovieCategory === action.payload) {
        state.selectedMovieCategory = null;
      } else {
        state.selectedMovieCategory = action.payload;
      }
    },
    setSelectedLiveCategory: (state, action) => {
      if (state.selectedLiveCategory === action.payload) {
        state.selectedLiveCategory = null;
      } else {
        state.selectedLiveCategory = action.payload;
      }
    },
    setSelectedSeriesCategory: (state, action) => {
      if (state.selectedSeriesCategory === action.payload) {
        state.selectedSeriesCategory = null;
      } else {
        state.selectedSeriesCategory = action.payload;
      }
    },
  },
});

export const {
  toggleMovieFavourites,
  toggleLiveFavourites,
  toggleSeriesFavourites,
  setSelectedLiveCategory,
  setSelectedMovieCategory,
  setSelectedSeriesCategory,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
