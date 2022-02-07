import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { fetchWithToken } from "../helpers/fetch";
import { scrollToBotton } from "../helpers/scroll";
import { types } from "../types/types";

export const SideBarChat = ({ info }) => {

  const { name, online, uid } = info
  const { dispatch, chatState } = useContext(ChatContext)
  const { socket } = useContext(SocketContext)

  const [writing, setWriting] = useState(false);
  const [whoWrite, setWhoWrite] = useState(false);
  
  useEffect(() => {
    socket?.on("writing", ({from, writing}) => {
      setWhoWrite(from)
      setWriting(writing)
    })
  }, [socket])

  const handleClick = () => {

    fetchWithToken(`messages/${uid}`)
    .then(messages => {
      dispatch({
        type: types.loadMessages,
        payload: {
          uid, 
          messages: messages.messages}
      })
      scrollToBotton("box_scroll")
    })

  }

  return (
    <div onClick={handleClick} className={(uid === chatState.activeChat) ? "chat_list active_chat" : "chat_list"}>
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{name}</h5>
          {
            (writing && whoWrite === uid) ? (
              <span className="text-primary">Escribiendo...</span>
            ) : (
                (online)
                ? <span className="text-success">Online</span>
                : <span className="text-danger">Offline</span>
            )
            
          }


        </div>
      </div>
    </div>
  );
};
