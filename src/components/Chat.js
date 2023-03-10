import React, { useState,useEffect } from "react";
import "../css/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from 'axios'
import { useParams } from "react-router-dom";
//import Pusher from 'pusher-js'

function Chat({ messages, className }) {
  const {_id} = useParams();
  const [data, setdata] = useState({})
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.post(`http://localhost:5000/whatsapp/${_id}`).then((result)=>{
      console.log(result.data[0]);
      setdata({...result.data[0]});
    })
  }, [_id])
  

  const sendMessage = async(e) => {
    e.preventDefault();
    //some code
    console.log(data)
    await axios.post('http://localhost:5000/messages/new', {
      name: data.username,
      message: message,
      timestamp: new Date().toUTCString(),
      received: true
    })
    setMessage("");
  };

  const deleteMessage = async(a)=>{
    //console.log(a)
    await axios.delete(`http://localhost:5000/messages/delete?delete=${a}`).then((data)=>{
      alert('Are you sure?');  
    })
    
  }
  return (
    <div className={"chat " + className}>
      <div className="chat__header">
        <Avatar />
        <div className="header__info">
          <p>
            <span style={{ fontWeight: "bold" }}>Room name</span>
            <br />
            <span style={{ fontSize: "13px", color: "grey" }}>
              Last seen at...
            </span>
          </p>
        </div>
        <div className="header__right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((a) => {
          //we are using callback inside of a callback to pass parameters
         return <p className={`chat__message ${a.name === data.username && "sender"}`} key={a._id} onClick={() => deleteMessage(a._id)}>
            <span className="messager__name">{a.name}</span>
            <span className="message">{a.message}</span>
            <span className="timestamp">{a.timestamp}</span>
          </p>;
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form className="message__bar">
          <input
            type="text"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
