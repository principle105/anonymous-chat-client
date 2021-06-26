import React from "react"
import styles from "../styles/components/Messages.module.css"

const Message = (props) => {
  const { msg, author, index } = props;
  return (
    <div key={index} className={`${styles.msg} ${author === msg.user ? styles.right : styles.left}`}>
      <div className={styles.bubble}>
        <div className={styles.info}>
          <p className={styles.name}>{msg.user}</p>
          <p className={styles.time}>Time</p>
        </div>
        <p>{msg.text}</p>
      </div>
    </div>
  )
}

export default Message;
