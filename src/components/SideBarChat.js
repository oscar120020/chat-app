import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchWithToken } from "../helpers/fetch";
import { scrollToBotton } from "../helpers/scroll";
import { types } from "../types/types";

export const SideBarChat = ({ info }) => {

  const { name, online, uid } = info
  const { dispatch, chatState } = useContext(ChatContext)

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
            online 
            ? <span className="text-success">Online</span>
            : <span className="text-danger">Offline</span>
          }

          {/* <>
            <h5>
              Sunil Rajput <span className="chat_date">Dec 25</span>
            </h5>
            <p>
              Test, which is a new approach to have all solutions astrology
              under one roof.
            </p>
          </> */}
        </div>
      </div>
    </div>
  );
};
