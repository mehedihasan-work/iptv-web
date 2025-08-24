import { useFetchSeriesInfoQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";

function SingleSeriesPage() {
  const { id } = useParams();
  // const [playTrailer, setPlayTrailer] = useState(false);
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const { data: seriesInfo } = useFetchSeriesInfoQuery({
    baseUrl,
    username,
    password,
    seriesId: id,
  });

  console.log(seriesInfo);

  return (
    <div className="h-screen bg-gradient-to-br from-[#6c3cb9] to-[#172554] px-4 py-5 overflow-hidden">
      <div className="flex h-full gap-5">
        {/* Series Cover */}
        <div className="flex-1">
          <div className="w-full h-[600px] relative rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <img
                src={seriesInfo?.data?.info?.cover}
                alt={seriesInfo?.data?.info?.name}
                className="w-full bg-center"
              />
            </div>
            <button className="h-full w-full flex justify-center absolute top-0 left-0 z-10 bg-violet-900/70">
              <img
                src={seriesInfo?.data?.info?.cover}
                alt={seriesInfo?.data?.info?.name}
                className="h-full"
              />
            </button>
          </div>
        </div>
        {/* Series Episodes */}
        <div className="w-[500px] bg-white"></div>
      </div>
    </div>
  );
}

export default SingleSeriesPage;
