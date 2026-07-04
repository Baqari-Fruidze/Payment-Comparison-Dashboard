"use client";

import React from "react";
import CompaniesSectionHeader from "./CompaniesSectionHeader";
import CompaniesTable from "./CompaniesTable";

export default function CompaniesMain() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <CompaniesSectionHeader />
      </div>

      {/* Table */}
      <CompaniesTable />

      {/* Footer link */}
      <div className="px-5 py-3 border-t border-gray-100 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          ყველა კომპანიის ნახვა →
        </button>
      </div>
    </div>
  );
}
