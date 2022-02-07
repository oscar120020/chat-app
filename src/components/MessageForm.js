import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const MessageForm = () => {

  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)
  const { chatState } = useContext(ChatContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!message) return;
    setMessage("")
    
    socket?.emit("inbox-message", {
      from: auth.uid,
      to: chatState.activeChat,
      message: message
    })

  }

  const time = useRef(null)

  const handleChange = ({target}) => {
    setMessage(target.value)
    socket?.emit("writing", {
      writing: true, 
      from: auth.uid,
      to: chatState.activeChat,
    })
    clearInterval(time.current)
    time.current = setInterval(() => {
      socket?.emit("writing", {
        writing: false, 
        from: auth.uid,
        to: chatState.activeChat,
      })
      clearInterval(time.current)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input type="text" className="write_msg" placeholder="Mensaje..." name="message" value={message} onChange={handleChange} />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
