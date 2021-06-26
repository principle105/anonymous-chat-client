import React, { useState } from "react"
import Picker from "emoji-picker-react";

import styles from "../styles/components/EmojiSelector.module.css";
import styles2 from "../styles/pages/Chat.module.css"

const EmojiSelector = (props) => {

  const [clicked, setClicked] = useState(false);


  const addToMessage = (event, emojiObject) => {
    props.setMessage(m => [...m, emojiObject.emoji])
  }

  return (
    <>
      {clicked ? (
        <div className={styles.container}>
        <Picker onEmojiClick={addToMessage} />
      </div>
      ) : null}
      <button className={styles2.icon} onClick={() => setClicked(!clicked)}>😃</button>
    </>
    
  )
}

export default EmojiSelector;
