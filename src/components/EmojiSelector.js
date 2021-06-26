import React, { useState, useEffect, useRef } from "react"
import Picker from "emoji-picker-react";

import styles from "../styles/components/EmojiSelector.module.css";
import styles2 from "../styles/pages/Chat.module.css"

const EmojiSelector = (props) => {

  const [clicked, setClicked] = useState(false);
  const node = useRef();

  const addToMessage = (event, emojiObject) => {
    props.setMessage(m => m + emojiObject.emoji)
    setClicked(false);
  }

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClicked(false);
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [clicked]);

  return (
    <div ref={node}>
      {clicked ? (
        <div className={styles.container}>
          <Picker onEmojiClick={addToMessage} />
        </div>
      ) : null}
      <button className={styles2.icon} onClick={() => setClicked(!clicked)}>😃</button>
    </div>
    
  )
}

export default EmojiSelector;
