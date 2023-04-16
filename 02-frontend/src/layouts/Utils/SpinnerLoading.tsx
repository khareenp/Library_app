import React from "react";

const SpinnerLoading = () => {
  return (
    <div
      className="cointainer m-5 d-flex justify-content-centers"
      style={{ height: 550 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoading;
