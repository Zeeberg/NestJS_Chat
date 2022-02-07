import React from "react";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>Test Chat</div>
      </div>
    </div>
  );
};

export default Header;
