import { useRouter } from "next/router";
import { genres } from "@/arr.data.js";
import { GenresI } from "@/types/GenresI";
import styles from "./Genre.module.css";

const GenreById = () => {
  const router = useRouter();
  const { id } = router.query;

  const genreId = Array.isArray(id) ? id[0] : id;

  const genreIdNumber = genreId ? parseInt(genreId, 10) : null;

  const genre: GenresI | undefined = genres.find(
    (g: GenresI) => g.id === genreIdNumber
  );

  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{genre.name}</h1>
      <img src={genre.img} alt={genre.name} className={styles.image} />
    </div>
  );
};

export default GenreById;
