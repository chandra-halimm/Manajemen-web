import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-row bg-[#ebf7ff] h-screen w-screen overflow-hidden">
      <Sidebar />
      {/* <div className="bg-teal-200">header</div> */}
      <di className="flex-1">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </di>
    </div>
  );
}
