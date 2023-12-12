import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAppSelector } from "../../redux/hook";
import { Outlet } from "react-router-dom";
import Loader from "../common/Loader";

const PersistLogin = () => {
  const { auth } = useAppSelector((state) => state);
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // isMounted is using for no memory leak
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        // console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
