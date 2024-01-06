import React from "react";

export default function DashboardGrid() {
  return (
    <section>
      <div className="bg-white rounded-sm p-4 flex-1 border-2 border-grey-200 flex flex-col mb-5">
        <h4 className="font-semibold text-gray-600 text-lg">Dashboard</h4>
      </div>

      <div className="flex gap-4">
        <BoxWrapper>
          <div>OKOK</div>
        </BoxWrapper>
        <BoxWrapper>b</BoxWrapper>
        <BoxWrapper>c</BoxWrapper>
        <BoxWrapper>d</BoxWrapper>
      </div>
    </section>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border-2 border-grey-200 flex items-center">
      {children}
    </div>
  );
}
