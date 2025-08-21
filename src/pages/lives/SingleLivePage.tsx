import { backendUrl } from "@/constants/sharedUrls";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mpegts from "mpegts.js";
import { FaArrowLeft } from "react-icons/fa";

function SingleLivePage() {
  const { id } = useParams();
  const { username, password, baseUrl } = useAppSelector((state) => state.auth);
  const liveUrl = `${backendUrl}/proxy?url=${baseUrl}/live/${username}/${password}/${id}.ts`;

  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mpegts.getFeatureList().mseLivePlayback && videoRef.current) {
      const player = mpegts.createPlayer({
        type: "mpegts",
        isLive: true,
        url: liveUrl,
      });

      player.attachMediaElement(videoRef.current);
      player.load();
      //   player.play();

      return () => {
        player.unload();
        player.detachMediaElement();
        player.destroy();
      };
    }
  }, [liveUrl]);

  return (
    <div className="flex justify-center items-center p-4 w-full h-svh bg-black">
      <button
        tabIndex={0}
        onClick={() => navigate("/lives")}
        className="absolute top-5 left-5 bg-violet-900 text-white w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-950 transition-colors duration-300 z-50 focus:border-blue-400"
      >
        <FaArrowLeft />
      </button>
      <div className="h-full min-w-[1000px] min-h-[500px]">
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}

export default SingleLivePage;
