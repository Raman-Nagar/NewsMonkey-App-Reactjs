import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingBar from "react-top-loading-bar";

const Layout = ({progress}) => {
  return (
    <>
      <LoadingBar color="#f11946" progress={progress} height={2} />
      <Navbar />
      <Outlet  />
    </>
  );
};

export default Layout;
