import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { EmptyMessage } from "./EmptyMessage";
import { MessageForm } from "./MessageForm";
import { MessageGet } from "./MessageGet";
import { MessageSend } from "./MessageSend";

export const Chat = () => {
  const { chatState } = useContext(ChatContext);
  const { activeChat } = chatState;

  return (
    <>
      <div className="mesgs">
        <div id="box_scroll" className="msg_history">
          {chatState.messages.length > 0 ? (
            chatState.messages.map((message) =>
              message.to === activeChat ? (
                <MessageSend key={message._id} message={message} />
              ) : (
                <MessageGet key={message._id} message={message} />
              )
            )
          ) : (
            <EmptyMessage />
          )}
        </div>
        <MessageForm />
      </div>
    </>
  );
};
