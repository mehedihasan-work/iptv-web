import React from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLazyFetchUserInfoQuery } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { login, setUser } from "../../redux/features/auth/authSlice";
import logo from "../../assets/icon.png";

function LoginPage() {
  const authUser = useAppSelector((state) => state.auth);
  const [baseUrl, setBaseUrl] = React.useState(authUser?.baseUrl || "");
  const [username, setUsername] = React.useState(authUser?.username || "");
  const [password, setPassword] = React.useState(authUser?.password || "");

  const [fetchUserInfo, { isFetching }] = useLazyFetchUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userInfo = { baseUrl, username, password };
    try {
      const response = await fetchUserInfo(userInfo).unwrap();
      if (response?.data?.user_info?.status === "Active") {
        dispatch(setUser(userInfo));
        dispatch(login());
        toast.success("Login successful");
        navigation("/");
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#8d4ff1] to-[#172554] gap-5">
      <div className="rounded-3xl overflow-hidden border-2 border-violet-500 -mt-5">
        <img src={logo} alt="logo" width={180} height={180} />
      </div>
      <div className="w-[500px] p-5">
        <h1 className="mb-5 text-center text-white font-bold text-2xl">
          LOGIN
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            tabIndex={0}
            type="text"
            className="border-violet-300 rounded-lg h-[55px] w-full border px-3 text-gray-300 font-semibold outline-none bg-violet-950/30"
            placeholder="URL"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
          <input
            tabIndex={0}
            type="text"
            className="border-violet-300 rounded-lg h-[55px] w-full border px-3 text-gray-300 font-semibold outline-none bg-violet-950/30"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            tabIndex={0}
            type="password"
            className="border-violet-300 rounded-lg h-[55px] w-full border px-3 text-gray-300 font-semibold outline-none bg-violet-950/30"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            tabIndex={0}
            className="w-full h-[50px] rounded mt-3 cursor-pointer 
             bg-violet-500 
             hover:bg-gray-900 
             focus:bg-violet-700 
             transition-all duration-300 ease-in-out"
            type="submit"
          >
            <span className="text-white rounded text-sm font-semibold">
              {isFetching ? "wait..." : "Login"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
