import React from "react"
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message";
import styles from "../styles/components/Messages.module.css"

const MessageDisplay = (props) => {
  return (
    <ScrollToBottom className={styles.container}>
      {
        props.messages.map((msg,index) => {
          return (
            <Message 
              author={props.author}
              msg={msg}
              key={index}
            />
          )
        })
      }
    </ScrollToBottom>
  )
}

export default MessageDisplay;
