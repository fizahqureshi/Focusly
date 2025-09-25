import React from "react";
import styles from "./Motivation.module.css";

function Motivation({ show, message }) {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ""}`}>
      {message}
    </div>
  );
}
export default Motivation;
