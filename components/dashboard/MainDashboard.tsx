import MainHeader from "../header/MainHeader";
import MainInfoPanel from "../infoPanel/MainInfoPanel";
import Sidebar from "../sidebar/Sidebar";

export default function MainDashboard() {
  return (
    <div className=" bg-gray-100">
    <MainHeader />
    <Sidebar/>
    <MainInfoPanel/>
    </div>
  )
}
