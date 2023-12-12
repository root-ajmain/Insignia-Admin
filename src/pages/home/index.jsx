import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import { Layout } from "antd";
import Header from "./components/Header";

const { Content, Sider } = Layout;

const Home = () => {
  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
        width={230}
      >
        <Sidebar />
      </Sider>

      <Layout id="sidebar" className="bg-[#EBF0F4]">
        <Content>
          <>
            <Header />
            <div
              style={{
                minHeight: 360,
                margin: "12px 16px 0",
              }}
            >
              <Outlet />
            </div>
          </>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
