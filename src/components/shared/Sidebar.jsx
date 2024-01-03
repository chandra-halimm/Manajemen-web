import React, { useState } from "react";
import { FcNews } from "react-icons/fc";
import {
  DASHBOARD_BOTTOM_LINK,
  DASHBOARD_SIDEBAR_LINK,
} from "../lib/consts/navigation";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-sky-500 hover:no-underline rounded-md duration-200";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (key) => {
    setActiveLink(key);
  };

  return (
    <div className="flex flex-col p-3 w-60 bg-white text-white shadow-md">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcNews fontSize={24} />
        <span className="text-lg text-[#0094ff] font-medium">
          Monica Intermedia
        </span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-1">
        {DASHBOARD_SIDEBAR_LINK.map((item) => (
          <SidebarLink
            key={item.key || "dashboard"}
            item={item}
            activeLink={activeLink}
            onClick={() => handleLinkClick(item.key)}
          />
        ))}
      </div>
      <div>
        {DASHBOARD_BOTTOM_LINK.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            activeLink={activeLink}
            onClick={() => handleLinkClick(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ item, activeLink, onClick }) {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={item.path}
      className={classNames(linkClasses, {
        "bg-sky-500": activeLink === item.key,
        "font-semibold shadow-md": pathname === item.path,
        "text-[#0094ff] font-medium": pathname !== item.path,
      })}
      activeClassName=""
      onClick={onClick}
    >
      {item.label}
    </NavLink>
  );
}
