import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useFetchMovieCategoriesQuery,
  useFetchMoviesQuery,
} from "../../redux/features/auth/authApi";
import { setSelectedLiveCategory } from "../../redux/features/favourite/favouriteSlice";
import { ShowPagination } from "../../components/shared/ShowPagination";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import noIconPoster from "../../assets/no-poster.png";

function AllLivePage() {
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const selectedCategory = useAppSelector(
    (state) => state.favourites.selectedLiveCategory
  );
  const dispatch = useAppDispatch();

  const [liveSearchText, setLiveSearchText] = useState("");
  const [categorySearchText, setCategorySearchText] = useState("");
  const [allMoviesList, setAllMoviesList] = useState<any[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 200;

  const { data: movieData } = useFetchMoviesQuery({
    username,
    password,
    baseUrl,
  });
  const { data: categoryData } = useFetchMovieCategoriesQuery({
    username,
    password,
    baseUrl,
  });

  // Filter live streams by selected category
  useEffect(() => {
    if (movieData?.data) {
      if (selectedCategory) {
        const filteredLives = movieData.data.filter(
          (live: any) => live.category_id === selectedCategory
        );
        setAllMoviesList(filteredLives);
      } else {
        setAllMoviesList(movieData.data);
      }
    }
  }, [movieData, selectedCategory]);

  const filteredLives = liveSearchText
    ? allMoviesList.filter((live) =>
        live.name.toLowerCase().includes(liveSearchText.toLowerCase())
      )
    : allMoviesList;

  const totalPages = Math.ceil(filteredLives.length / pageSize);

  const paginatedLives = filteredLives.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ----- Remote Navigation Refs -----
  const topSearchRef = useRef<HTMLInputElement | null>(null);
  const categorySearchRef = useRef<HTMLInputElement | null>(null);
  const categoryRefs = useRef<HTMLButtonElement[]>([]);
  const movieRefs = useRef<HTMLAnchorElement[]>([]);

  const [focusedList, setFocusedList] = useState<
    "topSearch" | "categorySearch" | "categories" | "movies"
  >("topSearch");
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);
  const [focusedMovieIndex, setFocusedMovieIndex] = useState(0);

  // Handle Arrow/Enter keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 40:
          e.preventDefault();
          if (focusedList === "topSearch") {
            setFocusedList("categorySearch");
          } else if (focusedList === "categorySearch") {
            setFocusedList("categories");
          } else if (focusedList === "categories") {
            setFocusedCategoryIndex((prev) =>
              Math.min(prev + 1, categoryRefs.current.length - 1)
            );
          } else if (focusedList === "movies") {
            setFocusedMovieIndex((prev) =>
              Math.min(prev + 1, movieRefs.current.length - 1)
            );
          }
          break;
        case 38:
          e.preventDefault();
          if (focusedList === "categorySearch") {
            setFocusedList("topSearch");
          } else if (focusedList === "categories") {
            if (focusedCategoryIndex === 0) {
              setFocusedList("categorySearch");
            } else {
              setFocusedCategoryIndex((prev) => Math.max(prev - 1, 0));
            }
          } else if (focusedList === "movies") {
            setFocusedMovieIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case 37:
          e.preventDefault();
          if (focusedList === "movies" && categoryRefs.current.length) {
            setFocusedList("categories");
          }
          break;
        case 39:
          e.preventDefault();
          if (
            (focusedList === "categories" ||
              focusedList === "categorySearch") &&
            movieRefs.current.length
          ) {
            setFocusedList("movies");
          }
          break;
        case 13:
          e.preventDefault();
          if (focusedList === "categories") {
            categoryRefs.current[focusedCategoryIndex]?.click();
          } else if (focusedList === "movies") {
            movieRefs.current[focusedMovieIndex]?.click();
          } else if (focusedList === "topSearch") {
            topSearchRef.current?.focus();
          } else if (focusedList === "categorySearch") {
            categorySearchRef.current?.focus();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedList, focusedCategoryIndex, focusedMovieIndex]);

  // Auto focus
  useEffect(() => {
    if (focusedList === "topSearch") {
      topSearchRef.current?.focus();
    } else if (focusedList === "categorySearch") {
      categorySearchRef.current?.focus();
    } else if (focusedList === "categories") {
      categoryRefs.current[focusedCategoryIndex]?.focus();
      categoryRefs.current[focusedCategoryIndex]?.scrollIntoView({
        block: "nearest",
      });
    } else if (focusedList === "movies") {
      movieRefs.current[focusedMovieIndex]?.focus();
      movieRefs.current[focusedMovieIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedList, focusedCategoryIndex, focusedMovieIndex, paginatedLives]);

  return (
    <div className="h-screen bg-gradient-to-br from-[#6c3cb9] to-[#172554] px-4 py-5 overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">All Movies</h1>
        </div>

        <div className="flex border-2 border-violet-600 bg-violet-950/30 items-center px-3 rounded-2xl w-[300px]">
          <FaSearch className="text-lg text-gray-500" />
          <input
            ref={topSearchRef}
            type="text"
            value={liveSearchText}
            onChange={(e) => {
              setLiveSearchText(e.target.value);
              setCurrentPage(1);
            }}
            className="h-[40px] w-full px-3 text-gray-300 font-semibold outline-none focus:outline-blue-400"
            placeholder="Search movies"
          />
        </div>
      </div>

      <div className="flex items-start gap-5">
        {/* Categories */}
        <div className="bg-violet-950 w-[300px] h-[calc(100vh-100px)] rounded-lg p-2">
          <div className="flex border-2 border-violet-800 items-center px-2 rounded mb-2">
            <FaSearch className="text-lg text-gray-500" />
            <input
              ref={categorySearchRef}
              type="text"
              value={categorySearchText}
              onChange={(e) => setCategorySearchText(e.target.value)}
              className="h-[40px] w-full px-3 text-gray-300 font-semibold outline-none bg-violet-950/30 focus:border-blue-400"
              placeholder="Search categories"
            />
          </div>
          <div className="overflow-y-scroll h-[calc(100vh-170px)] flex flex-col">
            {categoryData?.data
              ?.filter((cat: any) =>
                cat?.category_name
                  ?.toLowerCase()
                  .includes(categorySearchText.toLowerCase())
              )
              .map((item: any, index: number) => (
                <button
                  key={item.category_id}
                  ref={(el: HTMLButtonElement | null) => {
                    categoryRefs.current[index] = el!;
                  }}
                  onClick={() =>
                    dispatch(setSelectedLiveCategory(item.category_id))
                  }
                  type="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  className={`border-b border-gray-500 w-full p-2 cursor-pointer hover:bg-violet-900 focus:ring-2 focus:ring-blue-400 transition-colors duration-300 text-white text-sm text-start ${
                    selectedCategory === item.category_id ? "bg-blue-500" : ""
                  }`}
                >
                  {item.category_name}
                </button>
              ))}
          </div>
        </div>

        {/* Movies */}
        <div className="container mx-auto h-[calc(100vh-100px)] overflow-y-scroll">
          <div className="flex justify-end mb-4">
            <ShowPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {!movieData?.data ? (
              <div className="w-full flex justify-center">
                <Loader2Icon className="animate-spin text-white" />
              </div>
            ) : (
              paginatedLives.map((movie: any, index: number) => {
                const movieIcon = movie?.stream_icon?.includes(
                  "http://starshare.live:8080"
                )
                  ? movie?.stream_icon.replace(
                      "http://starshare.live:8080",
                      "https://starshare.st"
                    )
                  : movie?.stream_icon;

                return (
                  <Link
                    key={movie.stream_id}
                    ref={(el: HTMLAnchorElement | null) => {
                      movieRefs.current[index] = el!;
                    }}
                    to={`/movies/${movie.stream_id}`}
                    className="w-[200px] h-[300px] bg-violet-200 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-violet-400 focus:ring-2 focus:ring-blue-400 transition-shadow duration-300"
                  >
                    <div>
                      <div className="h-[255px]">
                        <img
                          src={movieIcon === "" ? noIconPoster : movieIcon}
                          alt={movie.name}
                          width={300}
                          height={450}
                          className="h-full w-full bg-cover"
                        />
                      </div>
                      <p className="p-2 text-xs text-gray-700 font-medium">
                        {movie.name}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllLivePage;
