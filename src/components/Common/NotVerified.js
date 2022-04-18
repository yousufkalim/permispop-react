import React from "react";
import warningIcon from "../../assets/images/warning.png";

const NotVerified = () => {
  return (
    <div className="NotVeified-container">
      <div className="NotVeified-flex-container">
        <img
          className="home-logo img-fluid w-75"
          src={warningIcon}
          height={220}
          width={220}
          style={{ borderRadius: 100 }}
        />
        <div className="NotVeified-main-text">Only for Verified Users!</div>
        <div className="NotVeified-secondary-text">
          This area will be accessible once admin verify your profile,
          <br /> or you can send your non-verified documents
          <br /> to admin on{" "}
          <span style={{ color: "black" }}>admin@permispop.fr</span>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
