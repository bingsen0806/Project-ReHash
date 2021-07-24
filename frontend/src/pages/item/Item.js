import React, { useContext, useEffect, useState } from "react";
import "./item.css";
import TopBar from "../../components/topbar/TopBar";
import SingleItem from "../../components/singleItem/SingleItem";
import Chip from "@material-ui/core/Chip";
import { ArrowBackIos, ImageRounded } from "@material-ui/icons";
import SwapAway from "../../components/swapAway/SwapAway";
import UserItemCommand from "../../components/userItemCommand/UserItemCommand";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { storage } from "../../firebase";

export default function Item() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, sockio } = useContext(AuthContext);
  const itemId = useParams().itemId;
  const [item, setItem] = useState(null);
  const history = useHistory();
  const [copyLinkText, setCopyLinkText] = useState("");
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (itemId) {
          const res = await axios.get("/api/items?itemId=" + itemId);
          await setItem(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [itemId]);

  const handleReserve = async () => {
    try {
      if (itemId) {
        setInProgress(true);
        const res = await axios.put("/api/items/update/status/" + itemId, {
          status: "reserved",
        });
        if (res.status === 200 && res.data) {
          setItem(res.data);
        }
        setInProgress(false);
      }
    } catch (err) {
      setInProgress(false);
      console.log(err);
    }
  };

  const handleUnreserve = async () => {
    try {
      if (itemId) {
        setInProgress(true);
        const res = await axios.put("/api/items/update/status/" + itemId, {
          status: "waiting",
        });
        if (res.status === 200 && res.data) {
          setItem(res.data);
        }
        setInProgress(false);
      }
    } catch (err) {
      setInProgress(false);
      console.log(err);
    }
  };

  const handleSwap = async (agreementId) => {
    console.log("handleSwap called with agreementId: " + agreementId);
    try {
      setInProgress(true);
      const agreementRes = await axios.put(
        "/api/agreements/update/addParties/" + agreementId,
        { userId: user?._id, itemId: itemId }
      );
      if (agreementRes.status === 200 && itemId) {
        const res = await axios.put("/api/items/update/status/" + itemId, {
          status: "swapped",
        });
        if (res.status === 200 && res.data) {
          setItem(res.data);
        }
        setInProgress(false);
      }
      setInProgress(false);
    } catch (err) {
      setInProgress(false);
      console.log(err);
    }
  };

  const handleUnswap = async () => {
    console.log("handleUnswap called");
    try {
      setInProgress(true);
      const agreementRes = await axios.put(
        "/api/agreements/update/removeParties",
        {
          userId: user?._id,
          itemId: itemId,
        }
      );
      if (agreementRes.status === 200 && itemId) {
        const res = await axios.put("/api/items/update/status/" + itemId, {
          status: "waiting",
        });
        if (res.status === 200 && res.data) {
          setItem(res.data);
        }
        setInProgress(false);
      }
      setInProgress(false);
    } catch (err) {
      setInProgress(false);
      console.log(err);
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete called");
    if (item) {
      try {
        setInProgress(true);

        const tempItemId = item?._id;
        await axios.delete("/api/posts/filter?itemId=" + tempItemId);
        const res = await axios.delete("/api/items?itemId=" + item?._id);
        if (res.status === 200) {
          history.push("/profile/" + user.username + "/listings");
        }
        setInProgress(false);
        //image can be deleted only after push to the page so that process is faster. In case of fail deletion nothing much
        //only firebase will store more pictures
        for (var i = 0; i < item.img.length; i++) {
          var imageRef = storage.refFromURL(PF + item.img[i]);
          try {
            await imageRef.delete();
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        setInProgress(false);
        console.log(err);
      }
    }
  };

  const handleCopyLink = (type) => {
    console.log("copy link");
    var dummy = document.createElement("input");
    const text =
      type === "link" ? window.location.href : item?._id ? item._id : "";

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopyLinkText(
      type === "link"
        ? "Link to this page has been copied"
        : "Item ID has been copied"
    );
  };

  return (
    <div className="itemPage">
      <TopBar currentUser={user} />
      {/* <div className="itemBackArrow">
        <ArrowBackIos />
        <span>Back</span>
      </div> */}
      <label className="itemHeader">
        {item ? item.title : "Error: No Item Displayed"}
        {item ? (
          <Chip
            className="itemTag"
            label={item.status === "waiting" ? "available" : item.status}
            size="small"
            color={
              item.status === "waiting"
                ? ""
                : item.status === "reserved"
                ? "primary"
                : "secondary"
            }
            style={{
              marginLeft: "15px",
              marginRight: "10px",
              marginTop: "0px",
            }}
          />
        ) : (
          <></>
        )}
      </label>

      <Container className="itemImg">
        <Row>
          <Col>
            <SingleItem imgLinkArray={item ? item.img : []} />
          </Col>
          <Col>
            {user?._id === item?.userId ? (
              <UserItemCommand
                itemUserId={item?.userId}
                itemStatus={item?.status}
                handleReserve={handleReserve}
                handleUnreserve={handleUnreserve}
                handleDelete={handleDelete}
                handleSwap={handleSwap}
                handleUnswap={handleUnswap}
                inProgress={inProgress}
              />
            ) : (
              <SwapAway itemUserId={item?.userId} />
            )}
          </Col>
        </Row>
      </Container>
      {/* <div className="itemImg">
                <SingleItem />
                <SwapAway />
            </div> */}
      <div className="itemHeaderSecond">
        <div className="itemGetLink" onClick={() => handleCopyLink("link")}>
          Copy Link
        </div>
        <div className="itemGetLink" onClick={() => handleCopyLink("id")}>
          Copy Item ID
        </div>
        <div className="itemCopyLinkText">{copyLinkText}</div>
      </div>
      <div className="itemDescription">
        <h5>Description</h5>
        <span>
          {item
            ? item.desc
            : "The item does not exist, and hence no description"}
        </span>
      </div>
      <div className="itemIdealSwaps">
        <h5>Ideal swaps</h5>
        {item?.idealSwaps.map((tags) => (
          <Chip
            className="tag"
            key={tags}
            label={tags}
            size="small"
            color="secondary"
            style={{ marginRight: "5px" }}
          />
        ))}
      </div>
    </div>
  );
}
