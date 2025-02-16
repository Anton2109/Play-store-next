import { Button } from "@/UI/Button/Button";
import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Авторизация</h1>
        <form>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
            <Button type="submit">Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
