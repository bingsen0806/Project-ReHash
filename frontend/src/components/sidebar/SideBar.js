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

export default function SideBar(props) {
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
          <img className="userProfile" src={props.src === undefined ? "/assests/userProfile.png" : props.src } alt="" />
        </CDBSidebarHeader>
        <CDBSidebarHeader style={{ textAlign: "center" }}>
          <div>David Rehasher</div>
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
            <CDBSidebarMenuItem>
              <LocalMall className="sidebarIcons" />
              <span className="sidebarMenuText">Listings</span>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <SwapVert className="sidebarIcons" />
              <span className="sidebarMenuText">Reviews</span>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <Settings className="sidebarIcons" />
              <span className="sidebarMenuText">Settings</span>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            <ExitToApp className="sidebarIcons" onClick={handleLogOut} />
            <span className="sidebarMenuText" onClick={handleLogOut}>
              Log out
            </span>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
