import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <Header/>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
