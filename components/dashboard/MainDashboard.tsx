import { Suspense } from "react";
import MainHeader from "../header/MainHeader";
import MainInfoPanel from "../infoPanel/MainInfoPanel";
import Sidebar from "../sidebar/Sidebar";
import CompaniesMain from "../companies/CompaniesMain";
import MainTranzactions from "../tranzactions/MainTranzactions";

export default function MainDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Suspense fallback={null}>
        <MainHeader />
      </Suspense>
      <div className="flex w-full gap-2">
        <Sidebar />

        <Suspense
          fallback={
            <div className="flex flex-1 gap-3 p-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-24 bg-white border border-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <div className="flex-1 w-full flex flex-col gap-5 p-4">
            <MainInfoPanel />
            <CompaniesMain />
            <MainTranzactions />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
