import React, { useContext } from "react";
import "./sidebar.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { LocalMall, SwapVert, ExitToApp, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function SideBar({ sidebarUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, sockio, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogOut = async (e) => {
    e.preventDefault();
    const logoutCall = async (dispatch) => {
      dispatch({ type: "LOGOUT_START", payload: { user: user, sock: sockio } });
      try {
        await sockio.disconnect();
        dispatch({ type: "LOGOUT_SUCCESS" });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    };
    await logoutCall(dispatch);
    history.push("/login");
    console.log("logged out");
  };

  const handleListings = () => {
    history.push("/profile/" + sidebarUser?.username + "/listings");
    console.log("done");
  };
  const handleReviews = () => {
    history.push("/profile/" + sidebarUser?.username + "/reviews");
  };
  const handleSettings = () => {
    history.push("/profile/" + sidebarUser?.username + "/settings");
  };
  return (
    <div
      className="sidebar"
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="black" backgroundColor="#FFD68D">
        <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
        <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
        <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
        <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <img
            className="userProfile"
            src={
              sidebarUser?.profilePicture
                ? PF + sidebarUser.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </CDBSidebarHeader>
        <CDBSidebarHeader style={{ textAlign: "center" }}>
          <div>{sidebarUser?.username}</div>
          <div className="ratings">
            <span>Ratings:</span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              onClick={handleListings}
              className="sidebarMenuItem"
            >
              <LocalMall className="sidebarIcons" />
              <span className="sidebarMenuText">Listings</span>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              className="sidebarMenuItem"
              onClick={handleReviews}
            >
              <SwapVert className="sidebarIcons" />
              <span className="sidebarMenuText">Reviews</span>
            </CDBSidebarMenuItem>
            {sidebarUser && sidebarUser._id === user?._id ? (
              <CDBSidebarMenuItem
                className="sidebarMenuItem"
                onClick={handleSettings}
              >
                <Settings className="sidebarIcons" />
                <span className="sidebarMenuText">Settings</span>
              </CDBSidebarMenuItem>
            ) : (
              <></>
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>
        {sidebarUser && sidebarUser._id === user?._id ? (
          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: "20px 5px" }}
            >
              <ExitToApp className="sidebarIcons" onClick={handleLogOut} />
              <span className="sidebarMenuText" onClick={handleLogOut}>
                Log out
              </span>
            </div>
          </CDBSidebarFooter>
        ) : (
          <></>
        )}
      </CDBSidebar>
    </div>
  );
}
