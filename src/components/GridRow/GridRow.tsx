import React from "react";

interface GridRowType {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const GridRow = ({ children, style, onClick }: GridRowType) => {
  return (
    <div
      className="col-span-3 grid grid-cols-3 grid-rows-1 p-1 divide-x divide-slate-50"
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GridRow;
