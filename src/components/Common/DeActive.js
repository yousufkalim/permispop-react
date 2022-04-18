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
        <div className="NotVeified-main-text">
          Your Account have been Deactived!
        </div>
        <div className="NotVeified-secondary-text">
          This area will be accessible once admin activate your profile
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
