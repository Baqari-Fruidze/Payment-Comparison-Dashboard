"use client";

import React from "react";
import TranzactionsTags from "./TranzactionsTags";
import TranzactionsTable from "./TranzactionsTable";

export default function MainTranzactions() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <h3 className="mb-3 font-semibold text-base text-gray-800">
          ტრანზაქციები
        </h3>
      </div>

      {/* Filter tags + search */}
      <div className="px-5 pb-3">
        <TranzactionsTags />
      </div>

      {/* Table */}
      <TranzactionsTable />
    </div>
  );
}
