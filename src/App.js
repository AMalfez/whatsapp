import React, { useEffect, useState } from "react";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get("/messages")
      .then(function (response) {
        // handle success
        //console.log(response.data);
        setMessages(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // //console.log(messages);
  useEffect(() => {
    const pusher = new Pusher("100bbe4d789f0e8e89f5", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });
    channel.bind("deleted", (data) => {
      console.log(data);
      setMessages(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="app__container form">
                <Signup />
              </div>
            }
          />

          <Route
            path="/whatsapp/:_id"
            element={
              <div className="app__container">
                <SideBar className="none"/>
                <Chat messages={messages}  />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
