import React, { useEffect, useState } from "react"
import ReactTypingEffect from "react-typing-effect";
import io from "socket.io-client";
import { ENDPOINT } from "../base";

import Messages from "../components/Messages";
import SideBar from "../components/SideBar";
import EmojiSelector from "../components/EmojiSelector";
import styles from "../styles/pages/Chat.module.css";

let socket;

const Chat = (props) => {

  const { name } = props
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [typingData, setTypingData] = useState({});

  const [typing, setTyping] = useState(false);

  const skipRoom = () => {
    socket.emit("leaveRoom")
  }

  useEffect(() => { 

    socket = io(ENDPOINT);
    
    socket.emit("join", { name }, (response) => {
      setRoom(response)
    })

    return () => {
      socket.disconnect()
    }

  },[name])

  useEffect(() => {
    // Listening for new messages
    socket.on("message", (message) => {
      setMessages(m => [...m, message])
    })
    // Getting new room data
    socket.on("roomData", (userData) => {
      setUsers(userData)
    })

    // Room being ended
    socket.on("endRoom", () => {
      setMessage("");
      setRoom("");
    })

    // when user joins a new room after another one ends
    socket.on("joinNew", () => {
      setUsers([]);
      setMessages([]);
      socket.emit("join", { name }, (response) => {
        setRoom(response)
      })
    })

    // When another user's typing status changes
    socket.on("sendTypingData", ({name, typing}) => {
      setTypingData(t =>({...t, [name] : typing}))
    })

  }, [name])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typing === true) {
        socket.emit("typingData", { name, typing: false })
      }
      setTyping(false);
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      if (typing === false) {
        socket.emit("typingData", { name, typing: true })
      }
      setTyping(true);
    }
  }, [message])

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
            <>
              <div className={styles.chat_bar}>
                <textarea
                  className={styles.chat_input}
                  placeholder="Enter your message..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}>
                </textarea>
                <button className={styles.icon}>+</button>
                <EmojiSelector 
                  setMessage={setMessage}
                />
              </div>
              <div className={styles.user_typing}>
                {Object.keys(typingData).length < 1 ? (
                  <p style={{opacity: 0}}>-</p>
                ) : (
                  Object.keys(typingData).map((user, i) => {
                    if (typingData[user] === true) {
                      return <p key={i}>{user} is typing...</p>
                    } else {
                      return <p key={i} style={{opacity: 0}}>-</p>
                    }
                  })
                )}
                
              </div>
            </>
          )}
        </div>
        <SideBar 
          skipRoom={skipRoom}
          users={users}
        />
      </div>
      
    </div>
  )
}

export default Chat
