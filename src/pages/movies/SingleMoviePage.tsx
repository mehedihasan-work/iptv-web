import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "@/constants/sharedUrls";
import { useFetchMovieInfoQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import ReactPlayer from "react-player";
import { FaArrowLeft } from "react-icons/fa";

function SingleMoviePage() {
  const { id } = useParams();
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const { data: movieDetails } = useFetchMovieInfoQuery({
    baseUrl,
    username,
    password,
    vodId: id,
  });
  const navigate = useNavigate();

  const movieUrl = `${backendUrl}/proxy?url=${baseUrl}/movie/${username}/${password}/${id}.${movieDetails?.data?.movie_data?.container_extension}`;

  return (
    <div className="flex flex-col items-center w-full p-4 h-svh bg-black">
      <button
        tabIndex={0}
        onClick={() => navigate("/movies")}
        className="absolute top-5 left-5 bg-violet-900 text-white w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-950 transition-colors duration-300 z-50 focus:border-blue-400"
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-lg font-semibold text-white">
        Now Playing : {movieDetails?.data?.movie_data?.name}
      </h2>
      <div className="flex-1 max-w-[1200px]">
        {movieDetails?.data?.movie_data && (
          <ReactPlayer
            src={movieUrl}
            controls
            playing
            width="100%"
            height="100%"
            className="bg-gray-950"
          />
        )}
      </div>
    </div>
  );
}

export default SingleMoviePage;
