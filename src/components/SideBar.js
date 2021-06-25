import React from "react";
import styles from "../styles/components/SideBar.module.css";

const SideBar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.user_list}>
          {
            props.users.map(({name}) => {
              return <p key={name} className={styles.user}>{name}</p>
            })
          }
        </div>
      </div>
      <div className={styles.btns}>
        <button 
          className={styles.skip_btn}
          onClick={() => props.skipRoom()}>
            Skip
        </button>
        <button 
          className={styles.leave_btn}
          onClick={() => window.location.reload()}>
            Leave
        </button>
      </div>
    </div>
  )
}

export default SideBar;
