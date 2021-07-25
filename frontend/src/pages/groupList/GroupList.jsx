import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar/TopBar";
import GroupIcon from "../../components/groupIcon/GroupIcon";
import { AuthContext } from "../../context/AuthContext";
import { Row } from "react-bootstrap";
import "./groupList.css";

export default function GroupList() {
  const searchText = useParams().searchText;
  const [groups, setGroups] = useState([]);
  const { user, sockio } = useContext(AuthContext);
  useEffect(() => {
    const getGroups = async () => {
      try {
        if (searchText) {
          const res = await axios.get("/api/groups?search=" + searchText);
          await setGroups(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getGroups();
  }, [searchText]);
  return (
    <div>
      <TopBar currentUser={user} />
      <div className="productWrapper">
        <div className="productHeader">
          {searchText ? "Search results for: " + searchText : ""}
        </div>
        <Row className="listingRow" xl={5} lg={4} md={3} sm={2}>
          {groups.length > 0 ? (
            groups.map((group) => (
              <div key={group._id}>
                <GroupIcon
                  key={group._id}
                  groupImg={group.groupImg}
                  groupName={group.groupName}
                  groupId={group._id}
                />
              </div>
            ))
          ) : (
            <div className="productNoResult">No result</div>
          )}
        </Row>
      </div>
    </div>
  );
}
