import React from "react"
import styles from "../styles/components/Messages.module.css"
import Image from "./Image";
import renderToEmoji from "../utils/emoji";

const images = require.context("../../public/emojis", true);

const Message = (props) => {
  const { msg, author, index } = props;

  const formatDate = (date) => {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`
  }

  const renderEmojis = (s) => {
    let newString = [];
    let i = 0
    for (const ch of s) {
      i += 1
      // Checking if character is an emoji
      if (/\p{Extended_Pictographic}/u.test(ch)) {
        let hex = ch.codePointAt(0).toString(16)
        let img = React.createElement("img", {
          key: i,
          src: images(`./${hex}.svg`).default,
          style: {width: "20px", height: "20px"}
        }, null)
        newString.push(img)
      } else {
        newString.push(ch);
      }
    }
    return newString;
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
        <p>{renderToEmoji(msg.text)}</p>
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
