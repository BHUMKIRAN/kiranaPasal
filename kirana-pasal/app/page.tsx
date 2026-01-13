import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="pt-5 ml-5">
        <SideBarAll />
      </div>
    </div>
  );
};

export default HomePage;
