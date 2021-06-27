import React from "react";
import styles from "../styles/components/SideBar.module.css";

const SideBar = (props) => {

  const { users, author, skipRoom } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.user_list}>
          {
            users.map(({name},i) => {
              return (
                <div 
                  key={i} 
                  className={styles.user} 
                  style={{
                    opacity: name === author ? "1" : "0.6"
                  }}>
                  {name}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.btns}>
        <button 
          className={styles.skip_btn}
          onClick={() => skipRoom()}>
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
