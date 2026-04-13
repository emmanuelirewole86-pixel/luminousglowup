import { Outlet } from "react-router-dom";
import ForgeBottomNav from "./ForgeBottomNav";
import ForgeFloatingAction from "./ForgeFloatingAction";

const ForgeLayout = () => {
  return (
    <div className="forge-theme min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      <Outlet />
      <ForgeFloatingAction />
      <ForgeBottomNav />
    </div>
  );
};

export default ForgeLayout;
