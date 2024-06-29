import React, { useEffect } from "react";
import { loginStatusAction } from "../Store/Slices/loginStatusSlice";
import { userInfoAction } from "../Store/Slices/userInfoSlice";
import { useDispatch } from "react-redux";
import SideTabs from "../Component/DashBoard/SideTabs";
import { Outlet } from "react-router-dom";
import DashboardContextProvider from "../Store/ContextFiles/dashboard-store";

const DashBoard = () => {
  useEffect(() => {
    document.title = "LFO - Dashboard";
  }, []);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(loginStatusAction.authorization({ status: false }));
    dispatch(
      userInfoAction.setInfo({
        name: "",
        email: "",
        role: "",
      })
    );
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("auth");
    window.location.reload();
  };
  return (
    <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10">
      <div className="w-full lg:flex lg:justify-between">
        <SideTabs handleLogOut={handleLogOut} />
        <DashboardContextProvider>
          <div className="w-full lg:w-3/4 2xl:w-4/5">
            <Outlet />
          </div>
        </DashboardContextProvider>
      </div>
    </div>
  );
};

export default DashBoard;
