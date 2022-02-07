import React, { useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { SideBarChat } from "./SideBarChat";

export const SideBar = () => {
  const { chatState } = useContext(ChatContext)
  const { auth } = useContext(AuthContext)
  // const { socket } = useContext(SocketContext)
  const users = chatState.allPeople
  const uid = auth.uid

  return (
    <div className="inbox_chat">
      {
        users
        .filter((user) => user.uid !== uid)
        .map(user => <SideBarChat key={user.uid} info={user} />)
      }
      <div className="extra_space"></div>
    </div>
  );
};