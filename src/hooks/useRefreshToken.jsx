import { useEffect } from "react";
import useCookie from "./useCookie";
import { useGetRefreshTokenMutation } from "../redux/features/auth/authApi";
import { setAuth } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const { handleGetCookie } = useCookie();
  const token = handleGetCookie();
  const [getRefreshToken, { data }] = useGetRefreshTokenMutation();

  const refresh = async () => {
    const options = {
      data: { token },
    };
    await getRefreshToken(options);
  };

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return refresh;
};

export default useRefreshToken;
