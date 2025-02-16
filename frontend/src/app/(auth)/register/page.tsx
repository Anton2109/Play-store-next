import styles from "./Register.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Register</h1>
        <form>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
