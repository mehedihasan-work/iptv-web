import { useEffect, useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useFetchLiveCategoriesQuery,
  useFetchLiveStreamsQuery,
} from "../../redux/features/auth/authApi";
import { setSelectedLiveCategory } from "../../redux/features/favourite/favouriteSlice";
import { ShowPagination } from "../../components/shared/ShowPagination";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import noIconPoster from "../../assets/no-poster.png";

function AllLivePage() {
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const [liveSearchText, setLiveSearchText] = useState("");
  const [categorySearchText, setCategorySearchText] = useState("");
  const [allLiveList, setAllLiveList] = useState<any[]>([]);
  const selectedCategory = useAppSelector(
    (state) => state.favourites.selectedLiveCategory
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 200;

  const { data: liveData } = useFetchLiveStreamsQuery({
    username,
    password,
    baseUrl,
  });

  const { data: categoryData } = useFetchLiveCategoriesQuery({
    username,
    password,
    baseUrl,
  });

  useEffect(() => {
    if (liveData?.data) {
      if (selectedCategory) {
        // Filter live streams by selected category
        const filteredLives = liveData.data.filter(
          (live: any) => live?.category_id === selectedCategory
        );
        setAllLiveList(filteredLives);
      } else {
        setAllLiveList(liveData.data);
      }
    }
  }, [liveData, selectedCategory]);

  // Filtered + paginated movies
  const filteredLives = liveSearchText
    ? allLiveList.filter((live) =>
        live?.name?.toLowerCase().includes(liveSearchText.toLowerCase())
      )
    : allLiveList;

  const totalPages = Math.ceil(filteredLives.length / pageSize);

  const paginatedLives = filteredLives.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-screen bg-gradient-to-br from-[#6c3cb9] to-[#172554] px-4 py-5 overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-violet-950 text-white w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-950 transition-colors duration-300"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-white">All Tv Channels</h1>
        </div>

        <div className="flex border-2 border-violet-600 bg-violet-950/30 items-center px-3 rounded-2xl w-[300px]">
          <FaSearch className="text-lg text-gray-500" />
          <input
            type="text"
            value={liveSearchText}
            onChange={(e) => {
              setLiveSearchText(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="h-[40px] w-full px-3 text-gray-300 font-semibold outline-none"
            placeholder="Search movies"
          />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Categories */}
        <div className="bg-violet-950 w-[300px] h-[calc(100vh-100px)] rounded-lg p-2">
          <div className="flex border-2 border-violet-800 items-center px-2 rounded mb-2">
            <FaSearch className="text-lg text-gray-500" />
            <input
              type="text"
              value={categorySearchText}
              onChange={(e) => setCategorySearchText(e.target.value)}
              className="h-[40px] w-full px-3 text-gray-300 font-semibold outline-none bg-violet-950/30"
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
              .map((item: any) => (
                <button
                  key={item?.category_id}
                  onClick={() =>
                    dispatch(setSelectedLiveCategory(item?.category_id))
                  }
                  className={`border-b border-gray-500 w-full p-2 cursor-pointer hover:bg-violet-900 transition-colors duration-300 ease-in-out ${
                    selectedCategory === item?.category_id ? "bg-blue-500" : ""
                  }`}
                >
                  <p className="text-gray-300 font-semibold text-sm text-start">
                    {item?.category_name}
                  </p>
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
            {!liveData?.data ? (
              <div className="w-full flex justify-center">
                <Loader2Icon className="animate-spin text-white" />
              </div>
            ) : (
              paginatedLives.map((movie: any) => {
                const movieIcon = movie?.stream_icon?.includes(
                  "http://starshare.live:8080"
                )
                  ? movie?.stream_icon?.replace(
                      "http://starshare.live:8080",
                      "https://starshare.st"
                    )
                  : movie?.stream_icon;
                return (
                  <Link
                    className="w-[160px] bg-violet-200 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-violet-400 transition-shadow duration-300"
                    key={movie?.stream_id}
                    to={`/lives/${movie?.stream_id}`}
                  >
                    <div>
                      <div className="h-[150px]">
                        <img
                          src={movieIcon === "" ? noIconPoster : movieIcon}
                          alt={movie?.name}
                          width={300}
                          height={450}
                          className="h-full w-full bg-cover"
                        />
                      </div>
                      <p className="p-2 text-xs text-gray-700 font-medium">
                        {movie?.name}
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
