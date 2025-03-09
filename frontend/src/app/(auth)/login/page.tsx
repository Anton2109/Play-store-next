"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import styles from "./Login.module.css";
import { AuthI } from "@/types/AuthI";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<AuthI & { confirmPassword: string }>({
    mode: "onChange",
  });

  const router = useRouter();
  const password = watch("password");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (data: AuthI & { confirmPassword: string }) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Пароли не совпадают",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:4200/client/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Авторизация успешна!");
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        console.error("Ошибка при авторизации:", response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Ошибка при отправке данных:",
          error.response?.data.message || error.message
        );
      } else {
        console.error("Неизвестная ошибка:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Вход</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Электронная почта:
            <input
              type="email"
              className={styles.formInput}
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Неверный формат email",
                },
              })}
              autoComplete="off"
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Пароль:
            <input
              type="password"
              className={styles.formInput}
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 6,
                  message: "Минимальная длина пароля 6 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Максимальная длина пароля 16 символов",
                },
              })}
              autoComplete="off"
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Подтвердите пароль:
            <input
              type="password"
              className={styles.formInput}
              {...register("confirmPassword", {
                required: "Подтверждение пароля обязательно",
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
              autoComplete="off"
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </div>

        <button
          className={`${styles.regButton} ${
            !isValid ? styles.disabledButton : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>

        <div className={styles.ili}>Или</div>

        <Link href="/registration" className={styles.switchFormLink}>
          Нет аккаунта? Зарегистрироваться
        </Link>
      </form>
    </div>
  );
};

export default Login;
