import React from "react";
import "../css/SideBar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";

function SideBar({className}) {
  return (
    <div className={"sidebar " + className}>
      <div className="sidebar__header">
        <div className="sidebar__avatar">
          <Avatar />
        </div>
        <div className="sidebar__header__options">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__searchbar">
        <div className="search__container">
        <SearchOutlined/>
        <input className="Input__field" placeholder="search the rooms"/>
        </div>
      </div>
      <div className="sidebar__chatRooms">
        <SidebarChat newChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
       
      </div>
    </div>
  );
}

export default SideBar;
