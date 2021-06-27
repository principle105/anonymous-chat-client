import React, { useState, useEffect, useRef } from "react"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from 'emoji-mart'

import styles from "../styles/components/EmojiSelector.module.css";
import styles2 from "../styles/pages/Chat.module.css"

const EmojiSelector = (props) => {

  const [clicked, setClicked] = useState(false);
  const node = useRef();

  const addToMessage = (emoji) => {
    props.setMessage(m => m + emoji.colons)
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
    <div ref={node} className={styles.icon_container}>
      {clicked ? (
        <div className={styles.container}>
          <Picker 
            onSelect={addToMessage}
            theme="dark"
            set="twitter"
            title="Pick an Emoji"
          />
        </div>
      ) : null}
      <button className={styles2.icon} onClick={() => setClicked(!clicked)}>😃</button>
    </div>
  )
}

export default EmojiSelector;
