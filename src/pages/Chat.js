import React, { useEffect, useState } from "react"
import ReactTypingEffect from "react-typing-effect";

import socket from "../socketConfig";

import Messages from "../components/Messages";
import SideBar from "../components/SideBar";
import styles from "../styles/pages/Chat.module.css";

const Chat = (props) => {

  const { name } = props
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => { 
    
    socket.emit("join", { name }, (response) => {
      setRoom(response)
    })

    return () => {
      socket.emit("leave");
      socket.disconnect()
    }

  },[name])

  useEffect(() => {
    // Listening for new messages
    socket.on("message", (message) => {
      setMessages([...messages, message])
    })
    // Getting new room data
    socket.on("roomData", (userData) => {
      setUsers(userData)
    })

  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""))
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat Room ID: {room}</h1>
      <div className={styles.main}>
        <div className={styles.chat}>
          <Messages
            messages={messages}
            author={name}
          />

          {users.length < 2 ? (
            <div className={styles.waiting_msg}>
              <ReactTypingEffect
                typingDelay={100}
                eraseDelay={500}
                eraseSpeed={50}
                speed={100}
                cursor=" "
                text={["Waiting for another user to join..."]}
              />
            </div>
          ) : (
            <input
              className={styles.chat_input}
              placeholder="Enter your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}>
          </input>
          )}
        </div>
        <SideBar 
          users={users}
        />
      </div>
      
    </div>
  )
}

export default Chat
