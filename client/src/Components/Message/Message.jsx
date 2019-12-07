import React,{useState, useEffect} from "react";

const Message = ({messageObject, name}) => {  
  const {user} = messageObject  
  const justifyMessageSide = user === name ? "justify-right" : "justify-left"
  return (
    <>
        <div className={`single-message ${justifyMessageSide}`}>
          <div className="header-container">
            <p className="message-name">{messageObject.user}:</p>
            <p className="message-time">{messageObject.timestamp}</p>
          </div>
          <p className="message-description">{messageObject.message}</p>
        </div>
    </>
  );
};

export default Message;
