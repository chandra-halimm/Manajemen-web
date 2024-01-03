import React from "react";

export default function DashboardGrid() {
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div>OKOK</div>
      </BoxWrapper>
      <BoxWrapper>b</BoxWrapper>
      <BoxWrapper>c</BoxWrapper>
      <BoxWrapper>d</BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border-2 border-grey-200 flex items-center">
      {children}
    </div>
  );
}
