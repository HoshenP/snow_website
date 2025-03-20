import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "React App" }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav className={styles.nav}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}; 