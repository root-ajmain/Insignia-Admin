import Cookies from "js-cookie";

const useCookie = () => {
  const handleSetCookie = (token) => {
    return Cookies.set("rT", token);
  };

  const handleRemoveCookie = () => {
    return Cookies.remove("rT");
  };

  const handleGetCookie = () => {
    return Cookies.get("rT");
  };

  return { handleSetCookie, handleRemoveCookie, handleGetCookie };
};

export default useCookie;
