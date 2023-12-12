import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { userMenuDropdownLinks } from "../../../constants/menus";
import { HashLink } from "react-router-hash-link";
import { useAppDispatch } from "../../../redux/hook";
import profile__img from "../../../assets/images/profile/user-avatar.45a0af68515332b42be9.png";

import { useGetSystemConfigQuery } from "../../../redux/features/dashboard/dashboardApi";
import { setSystemConfig } from "../../../redux/features/dashboard/dashboardSlice";
import useCookie from "../../../hooks/useCookie";
import { logOut } from "../../../redux/features/auth/authSlice";

const Header = () => {
  const { handleRemoveCookie } = useCookie();
  const { data } = useGetSystemConfigQuery();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    handleRemoveCookie();
  };

  useEffect(() => {
    if (data?.statusCode === 200) {
      dispatch(setSystemConfig(data?.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="h-[70px] px-4 xl:px-10 shadow-md flex items-center justify-end backdrop-blur-lg bg-white bg-opacity-80 z-50 sticky top-0 max-w-screen-xl mx-auto rounded-bl-md rounded-br-md">
      <Menu as="div" className="relative">
        <Menu.Button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border border-[#d65050] flex items-center justify-center">
              <img src={profile__img} className="rounded-full" />
            </div>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow py-2 border text-brand__detail__text">
            {userMenuDropdownLinks.map(({ title, route, icon }) => (
              <Menu.Item key={title}>
                {title.includes("Logout") ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center border-t duration-300 px-4 py-1 text-sm capitalize text-red-700 gap-x-1"
                  >
                    {icon}
                    {title}
                  </button>
                ) : (
                  <HashLink
                    to={route}
                    className="flex w-full items-center duration-300 px-4 py-2 text-sm capitalize hover:bg-primary hover:text-white gap-x-1"
                  >
                    {icon}
                    {title}
                  </HashLink>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Header;
