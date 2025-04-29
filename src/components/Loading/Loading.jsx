import React from "react";
import { PuffLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="Loading_Wrap" style={{ minHeight: "760px" }}>
      <PuffLoader color="var(--blue-color)" size={300} speedMultiplier={0.5} />
      <span>잠시만 기다려 주세요 ...</span>
    </div>
  );
};
