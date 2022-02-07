import React from "react";
import { dateMonth } from "../helpers/dateMonth";

export const MessageSend = ({message}) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date">{dateMonth(message.createdAt)}</span>
      </div>
    </div>
  );
};
