import Footer from "@/components/Footer/page";
import Navbar from "@/components/Navbar/page";
import HomePage from "@/components/Home/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    // <div className={styles.pageContainer}>
    //   <Navbar />
    //   <Footer />
    // </div>
      <div className={styles.content}>
        <HomePage />
      </div>
  );
}