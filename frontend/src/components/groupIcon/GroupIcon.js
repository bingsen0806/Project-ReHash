import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./groupIcon.css";

export default function GroupIcon({ groupImg, groupName, groupId, create }) {
  //should limit to 35-40 characters
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const ADD_GROUP_IMAGE = process.env.REACT_APP_PUBLIC_FOLDER_ADDGROUP;
  const NO_GROUP_IMAGE = process.env.REACT_APP_PUBLIC_FOLDER_NOIMAGEUPLOADED;
  const { user, sockio } = useContext(AuthContext);
  const [newGroupName, setNewGroupName] = useState("");
  const history = useHistory();

  const handleClickGroupIcon = () => {
    if (groupId) {
      history.push("/groups/" + groupId + "/main");
    }
  };

  const handleCreateNewGroup = async () => {
    if ((newGroupName.match(/^\s*\n*\t*$/) || []).length > 0) {
      console.log("newGroupName is empty!");
      setNewGroupName("");
    } else if (user) {
      try {
        const newGroup = {
          creatorId: user._id,
          members: [user._id],
          description:
            "No description yet. Waiting for group creator to update description.",
          groupName: newGroupName,
        };
        const res = await axios.post("/api/groups", newGroup);
        if (res.status === 200) {
          setNewGroupName("");
          history.push("/groups/" + res.data._id + "/main");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return create ? (
    <div className="groupIconButtonBackgroundCreate">
      <img
        className="groupIconButtonImg"
        src={ADD_GROUP_IMAGE}
        onClick={handleCreateNewGroup}
        alt=""
      />
      <textarea
        rows={3}
        maxlength="50"
        className="groupIconTextArea"
        placeholder="Enter new group name (max 50 characters) and click '+'"
        value={newGroupName}
        onChange={(e) => {
          if (e.target.value.length <= 50) {
            setNewGroupName(e.target.value);
          }
        }}
      />
    </div>
  ) : (
    <div className="groupIconButtonBackground" onClick={handleClickGroupIcon}>
      <img
        className="groupIconButtonImg"
        src={groupImg ? PF + groupImg : NO_GROUP_IMAGE}
        alt=""
      />
      <div className="groupIconButtonName">
        {groupName ? groupName : "No Group Name"}
      </div>
    </div>
  );
}
