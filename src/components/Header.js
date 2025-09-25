 import { Target, Moon, Sun } from "lucide-react";
import styles from "./Header.module.css";

const Header = ({ theme, toggleTheme, appName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Target className={styles.logoIcon} />
          <div className={styles.textGroup}>
          <h1 className={styles.appName}>{appName}</h1>
          <p className={styles.tagline}>Stay focused beautifully </p>
          </div>
        </div>
        <button className={styles.themeButton} onClick={toggleTheme}>
          {theme === "light" ? <Moon color="white" /> : <Sun color="white" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
