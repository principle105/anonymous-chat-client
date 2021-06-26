import React from "react"
import styles from "../styles/components/Messages.module.css"
import Image from "./Image";

const Message = (props) => {
  const { msg, author, index } = props;

  const formatDate = (date) => {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`
  }

  return (
    <div key={index} className={`${styles.msg} ${author === msg.user ? styles.right : styles.left}`}>
      <div className={styles.bubble}>
        <div className={styles.info}>
          <p className={styles.name}>{msg.user}</p>
          <p className={styles.time}>
            {formatDate(new Date())}
          </p>
        </div>
        <p>{msg.text}</p>
        {msg.file ? (
         <Image 
          fileName={msg.file}
          blob={new Blob([msg.file.data], { type: msg.file.type })}
         />
        ) : null}
      </div>
    </div>
  )
}

export default Message;
