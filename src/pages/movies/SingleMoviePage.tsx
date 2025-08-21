import { useParams } from "react-router-dom";
import { backendUrl } from "@/constants/sharedUrls";
import { useFetchMovieInfoQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";

function SingleMoviePage() {
  const { id } = useParams();
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const { data: movieDetails } = useFetchMovieInfoQuery({
    baseUrl,
    username,
    password,
    vodId: id,
  });

  const movieUrl = `${backendUrl}/proxy?url=${baseUrl}/movie/${username}/${password}/${id}.${movieDetails?.data?.movie_data?.container_extension}`;

  return (
    <div className="flex flex-col items-center w-full h-svh bg-gray-900">
      <div className="flex-1 w-full">
        {movieDetails?.data?.movie_data && (
          <video
            key={movieUrl} // ensure re-render when url changes
            src={movieUrl}
            controls
            autoPlay
            className="bg-gray-950 w-full h-full"
          />
        )}
      </div>
    </div>
  );
}

export default SingleMoviePage;
