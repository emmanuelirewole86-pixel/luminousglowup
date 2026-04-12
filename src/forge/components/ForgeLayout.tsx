import { Outlet } from "react-router-dom";
import ForgeBottomNav from "./ForgeBottomNav";
import ForgeFloatingAction from "./ForgeFloatingAction";

const ForgeLayout = () => {
  return (
    <div className="forge-theme min-h-screen bg-[#FFF5F7] text-[#1a1a2e] font-sans relative overflow-x-hidden">
      <Outlet />
      <ForgeFloatingAction />
      <ForgeBottomNav />
    </div>
  );
};

export default ForgeLayout;
