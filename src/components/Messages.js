import React from "react"
import ScrollToBottom from 'react-scroll-to-bottom';
import styles from "../styles/components/Messages.module.css"

const MessageDisplay = (props) => {
  return (
    <ScrollToBottom className={styles.container}>
      {
        props.messages.map((msg,i) => {
          return (
            <div key={i} className={`${styles.msg} ${props.author === msg.user ? styles.right : styles.left}`}>
              <div className={styles.bubble}>
                <div className={styles.info}>
                  <p className={styles.name}>{msg.user}</p>
                  <p className={styles.time}>Time</p>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          )
        })
      }
    </ScrollToBottom>
  )
}

export default MessageDisplay;
