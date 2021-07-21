import React from "react";
import { useHistory } from "react-router-dom";
import "./groupIcon.css";

export default function GroupIcon({ groupImg, groupName, groupId }) {
  //should limit to 35-40 characters
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();

  const handleClickGroupIcon = () => {
    if (groupId) {
      history.push("/groups/" + groupId + "/main");
    }
  };
  return (
    <div className="groupIconButtonBackground" onClick={handleClickGroupIcon}>
      <img
        className="groupIconButtonImg"
        src={groupImg ? PF + groupImg : PF + "group.noImageUploaded.png"}
        alt=""
      />
      <div className="groupIconButtonName">
        {groupName ? groupName : "No Group Name"}
      </div>
    </div>
  );
}
