import { RiDashboardLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiPackage } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { AiFillPlayCircle, AiFillQuestionCircle } from "react-icons/ai";

export const sidebarOverviews = [
  {
    route: "dashboard",
    title: "Dashboard",
    icon: <RiDashboardLine />,
  },
  {
    route: "",
    title: "Analytics",
    icon: <TbBrandGoogleAnalytics />,
  },
];

export const sidebarManagements = [
  {
    route: "",
    title: "Packages",
    icon: <BiPackage />,
  },
  {
    route: "",
    title: "Bookings",
    icon: <BsBookmark />,
  },
  {
    route: "faq",
    title: "FAQ",
    icon: <AiFillQuestionCircle />,
  },
  {
    route: "video",
    title: "Videos",
    icon: <AiFillPlayCircle />,
  },
];

export const userMenuDropdownLinks = [
  {
    title: "Profile",
    route: "admin-profile",
  },
  {
    title: "Logout",
  },
];
