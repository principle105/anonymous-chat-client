import React, { useState } from "react";
import Chat from "../pages/Chat";

import styles from "../styles/pages/Join.module.css";

import { ToastContainer } from "react-toastify" ;

const Join = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const joinAttempt = (event) => {
    if (!name) {
      event.preventDefault();
    } else {
      setSubmitted(true);
    } 
  }

  return (
    <>
      <ToastContainer 
        draggable={false}
        autoClose={3000}
        pauseOnHover={false}
      />
      {submitted ? (
        <Chat 
          name={name}
        />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.join_title}>Join</h1>
          <input 
            className={styles.name_field}
            placeholder="username" 
            type="text" 
            onChange={(event) => setName(event.target.value)}>
          </input>

          <button 
            type="submit" 
            onClick={(event) => joinAttempt(event)} >
            Join
          </button>
        </div>
      )}
    </>
  )
}

export default Join;
