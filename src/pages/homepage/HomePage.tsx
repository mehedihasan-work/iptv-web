import { useEffect, useState } from "react";
import logo from "../../assets/icon.png";
import liveLogo from "../../assets/tv.png";
import moviesLogo from "../../assets/moveis.png";
import seriesLogo from "../../assets/series.png";
import { useNavigate } from "react-router-dom";
import {
  formatExpirationDate,
  getFormattedDate,
  getLiveTime,
} from "../../utils/getLiveTimeDate";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useFetchUserInfoQuery } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import { FaBook, FaSignOutAlt, FaSync, FaUserAlt } from "react-icons/fa";
import { MdPlayCircle } from "react-icons/md";

function HomePage() {
  const navigate = useNavigate();
  const [liveTime, setLiveTime] = useState(getLiveTime());
  const userInfo = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { data: userData } = useFetchUserInfoQuery(userInfo);

  const handleNavigation = (screen: string) => {
    navigate(`/${screen.toLowerCase()}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(getLiveTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col h-screen bg-gradient-to-br from-[#8d4ff1] to-[#172554] gap-5">
      <div className="p-7 flex flex-col h-full">
        {/* Top Section */}
        <div className="flex justify-between mb-10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
            <p className="font-bold text-2xl text-white">MYSB TV</p>
          </div>
          <div className="flex items-center gap-2 text-white">
            <p className="text-2xl font-bold">{liveTime}</p>
            <p className="font-semibold">{getFormattedDate()}</p>
          </div>
          <div className="flex items-center">
            <button
              tabIndex={0}
              onClick={handleLogout}
              className="text-3xl text-white hover:text-gray-400 transition-colors duration-300 ease-in-out cursor-pointer focus:text-blue-400"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        {/* Grid section and actions */}
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <button
                tabIndex={0}
                onClick={() => handleNavigation("Lives")}
                className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-gray-500 cursor-pointer focus:border-blue-400"
              >
                <img
                  src={liveLogo}
                  alt="Live"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover -rotate-12 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-900 flex flex-col items-center justify-center opacity-90">
                  <MdPlayCircle size={60} className="text-blue-100 mb-2" />
                  <span className="text-xl text-white">Live</span>
                </div>
              </button>
            </div>

            {/* Right Column: Movies & Series */}
            <div className="flex flex-col gap-3 flex-[2]">
              <div className="flex gap-3 flex-[5]">
                {/* Movies */}
                <button
                  tabIndex={0}
                  onClick={() => handleNavigation("Movies")}
                  className="flex-1 relative rounded-3xl overflow-hidden border-2 border-gray-500 cursor-pointer focus:border-blue-400"
                >
                  <img
                    src={moviesLogo}
                    alt="Movies"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rotate-12 scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-900 flex flex-col items-center justify-center opacity-90">
                    <MdPlayCircle size={60} className="text-blue-100 mb-2" />
                    <span className="text-xl text-white">Movies</span>
                  </div>
                </button>

                {/* Series */}
                <button
                  tabIndex={0}
                  onClick={() => handleNavigation("Series")}
                  className="flex-1 relative rounded-3xl overflow-hidden border-2 border-gray-500 cursor-pointer focus:border-blue-400"
                >
                  <img
                    src={seriesLogo}
                    alt="Series"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rotate-12 scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-blue-900 flex flex-col items-center justify-center opacity-90">
                    <MdPlayCircle size={60} className="text-blue-100 mb-2" />
                    <span className="text-xl text-white">Series</span>
                  </div>
                </button>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 h-[70px]">
                <button
                  tabIndex={0}
                  className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-700 to-blue-900 flex items-center justify-center gap-2 text-white border-2 border-gray-500 focus:border-blue-400"
                >
                  <FaBook size={14} />
                  <span>User Info</span>
                </button>
                <button
                  tabIndex={0}
                  className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-700 to-blue-900 flex items-center justify-center gap-2 text-white border-2 border-gray-500 focus:border-blue-400"
                >
                  <FaUserAlt size={14} />
                  <span>Account</span>
                </button>
                <button
                  tabIndex={0}
                  className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-700 to-blue-900 flex items-center justify-center gap-2 text-white border-2 border-gray-500 focus:border-blue-400"
                >
                  <FaSync size={14} />
                  <span>Catch Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom User Info */}
        <div className="flex justify-between mt-auto">
          <p className="text-white font-bold text-lg">
            Expiration:{" "}
            {userData?.data?.user_info?.exp_date
              ? formatExpirationDate(
                  Number(userData?.data?.user_info?.exp_date)
                )
              : "N/A"}
          </p>
          <p className="text-white font-bold text-lg">
            Username: {userData?.data?.user_info?.username || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
