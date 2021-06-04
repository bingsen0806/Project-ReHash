import React from 'react';
import "./sidebar.css";
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { LocalMall, SwapVert, ExitToApp, Settings } from "@material-ui/icons";

export default function SideBar() {
    return (
        <div className="sidebar" style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
            <CDBSidebar textColor="black" backgroundColor="#FFD68D">
                <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
                <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
                <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
                <CDBSidebarMenu className="dummyslot"></CDBSidebarMenu>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <img className="userProfile" src="/assests/userProfile.png" alt=""/>
                </CDBSidebarHeader>
                <CDBSidebarHeader style={{ textAlign: "center"}}>
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
                            <LocalMall className="sidebarIcons"/>
                            <span>Listings</span>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem>
                            <SwapVert className="sidebarIcons"/>
                            <span>Reviews</span>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem>
                            <Settings className="sidebarIcons"/>
                            <span>Settings</span>
                        </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{ textAlign: "center" }}>
                    <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px'}}>
                        <ExitToApp className="sidebarIcons"/>
                        <span className="logoutLink">Log out</span>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}
