import { Divider } from "antd";
import Banner from "./components/Banner";
import BannerText from "./components/BannerText";
import WindowImages from "./components/WindowImages";

const Dashboard = () => {
  return (
    <div className="max-w-screen-xl mx-auto h-full bg-white rounded-md shadow-md  p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <Banner />
        <WindowImages />
      </div>
      <Divider />
      <BannerText />
    </div>
  );
};

export default Dashboard;
