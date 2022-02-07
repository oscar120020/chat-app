import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { useForm } from "../hooks/useForm";

export const MessageForm = () => {

  const [ form, handleChange, _, reset ] = useForm({
    message: ''
  })

  const { socket } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)
  const { chatState } = useContext(ChatContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.message) return;
    reset()
    
    socket.emit("inbox-message", {
      from: auth.uid,
      to: chatState.activeChat,
      message: form.message
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input type="text" className="write_msg" placeholder="Mensaje..." name="message" value={form.message} onChange={handleChange} />
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
