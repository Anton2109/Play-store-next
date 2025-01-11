import styles from "./page.module.css";
import HomePage from '@/components/Home/page';

export default function Home() {
  return (
    <div className={styles.content}>
        <HomePage />
    </div>
  );
}