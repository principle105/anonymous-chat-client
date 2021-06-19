import React from "react";
import styles from "../styles/components/SideBar.module.css";

const SideBar = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.user_list}>
        {
          props.users.map(({name}) => {
            return <p key={name} className={styles.user}>{name}</p>
          })
        }
      </div>
    </div>
  )
}

export default SideBar;
