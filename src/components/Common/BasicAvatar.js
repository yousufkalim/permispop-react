import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Studentprofile from "../../assets/images/Studentprofile.png";

export default function BasicAvatars(props) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: props.online ? "#44b700" : "grey",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return (
    <>
      {props.showActiveStatus ? (
        <StyledBadge
          className={props.avatarBadgeclassName}
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant="dot"
          {...props.badgeProps}
        >
          <Avatar
            className={props.avatarclassName || "avatar"}
            onClick={props.onClick}
            src={props.src || Studentprofile}
            {...props.avatarProps}
          />
        </StyledBadge>
      ) : (
        <Avatar
          className={props.avatarclassName || "avatar"}
          onClick={props.onClick}
          src={props.src || Studentprofile}
          {...props.avatarProps}
        />
      )}
    </>
  );
}

/*

    <BasicAvatars
        showActiveStatus={true/false}   // to show the badge (offine/online)
        online={true/false}             // to show the status (online/offline)
        avatarBadgeclassName            // to use any customized css class for Avatar Badge
        badgeProps                      // to use any built-in props for badges
        avatarclassName                 // to use any customized css class for Avatar Badge
        avatarProps                     // to use any built-in props for avatar
        onClick={() => }                // to add functionality
    />

*/
