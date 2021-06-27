import React, { useState } from "react";
import Chat from "../pages/Chat";

import styles from "../styles/pages/Join.module.css";

import { toast, ToastContainer } from "react-toastify" ;

const Join = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const joinAttempt = (event) => {
    event.preventDefault();
    if (!name)
      return
    if (name.length > 12) {
      toast.error("Username exceeds limit of 12 characters", {
        toastId: "invalid-username"
      })
      return
    }
      setSubmitted(true);
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
          goToJoin={() => setSubmitted(false)}
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
