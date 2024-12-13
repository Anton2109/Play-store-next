import Link from "next/link";
import styles from "./Content.module.css";
import { genres } from "@/arr.data.js";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {genres.slice(0, 12).map((genre) => (
        <Link key={genre.id} href={`/genres/${genre.id}`}>
          <div className={styles.card}>
            <img src={genre.img} alt={genre.name} className={styles.image} />
            <h2 className={styles.title}>{genre.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
