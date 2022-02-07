import React from "react";
import { dateMonth } from "../helpers/dateMonth";

export const MessageGet = ({message}) => {
  
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message.message}</p>
          <span className="time_date">{dateMonth(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
