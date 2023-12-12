import Image from "../../../components/UI/Image";
import Insignia__logo from "../../../assets/images/brand/Insignia__logo.png";
import { HashLink } from "react-router-hash-link";
import { RiDashboardLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics, TbPhotoSquareRounded } from "react-icons/tb";
import { BiPackage } from "react-icons/bi";
import { BsBookmark, BsPeople } from "react-icons/bs";
import { MdOutlineSlowMotionVideo, MdOutlineRateReview } from "react-icons/md";
import { FaQuora } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineMessage, AiOutlineQuestionCircle } from "react-icons/ai";
import { Menu } from "antd";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <HashLink className="text-brand__font__size__base" to="dashboard">
      Dashboard
    </HashLink>,
    "1",
    <RiDashboardLine size={18} />
  ),
  getItem(
    <HashLink className="text-brand__font__size__base" to="analytics">
      Analytics
    </HashLink>,
    "2",
    <TbBrandGoogleAnalytics size={18} />
  ),
  getItem(
    <HashLink className="text-brand__font__size__base" to="packages">
      Packages
    </HashLink>,
    "4",
    <BiPackage size={18} />
  ),
  getItem(
    <HashLink className="text-brand__font__size__base" to="bookings">
      Bookings
    </HashLink>,
    "5",
    <BsBookmark size={18} />
  ),
  getItem(
    <HashLink className="text-brand__font__size__base" to="faq">
      FAQ
    </HashLink>,
    "6",
    <FaQuora size={18} />
  ),

  getItem(
    <HashLink className="text-brand__font__size__base" to="video">
      Video Gallery
    </HashLink>,
    "7",
    <MdOutlineSlowMotionVideo size={18} />
  ),
  getItem(
    <HashLink className="text-brand__font__size__base" to="photos">
      photo Gallery
    </HashLink>,
    "8",
    <TbPhotoSquareRounded size={18} />
  ),
  getItem(
    <span className="text-brand__font__size__base">Inbox</span>,
    "9",
    <AiOutlineMessage size={18} />,
    [
      getItem(
        <HashLink className="text-brand__font__size__base" to="questions">
          Questions
        </HashLink>,
        "10",
        <AiOutlineQuestionCircle size={18} />
      ),
      getItem(
        <HashLink className="text-brand__font__size__base" to="reviews">
          Reviews
        </HashLink>,
        "11",
        <MdOutlineRateReview size={18} />
      ),
    ]
  ),
  getItem(
    <span className="text-brand__font__size__base">Members</span>,
    "12",
    <IoIosPeople size={18} />,
    [
      getItem(
        <HashLink className="text-brand__font__size__base" to="customer-list">
          Customer
        </HashLink>,
        "13",
        <BsPeople size={18} />
      ),
      getItem(
        <HashLink className="text-brand__font__size__base" to="admin-list">
          Admin
        </HashLink>,
        "14",
        <RiAdminLine size={18} />
      ),
    ]
  ),
];

const Sidebar = () => {
  return (
    <aside>
      <div className="p-4">
        <Image src={Insignia__logo} className="w-[110px] h-[50px]" />
      </div>

      <div>
        <div className="text-brand__font__size__base">
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
