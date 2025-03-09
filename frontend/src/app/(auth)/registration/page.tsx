"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { AuthI } from "@/types/AuthI";
import styles from "./Register.module.css";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthI>({ mode: "onChange" });
  const router = useRouter();

  const onSubmit = async (data: AuthI) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/client/clients",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        router.push("/authorization");
        console.log("Регистрация успешна!");
      } else {
        console.log("Ошибка при регистрации");
        console.error("Ошибка:", response.data.message);
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

        <label className={styles.formLabel}>
          Username:
          <input
            type="text"
            {...register("username", {
              required: "Поле обязательно для заполнения",
              maxLength: {
                value: 15,
                message: "Максимальная длина 15 символов",
              },
            })}
            autoComplete="off"
          />
          {errors.username && (
            <span className={styles.errorMessage}>{errors.username.message}</span>
          )}
        </label>

        <label className={styles.formLabel}>
          Email:
          <input
            type="text"
            {...register("email", {
              required: "Поле обязательно для заполнения",
              maxLength: {
                value: 15,
                message: "Максимальная длина 15 символов",
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

        <label className={styles.formLabel}>
          Пароль:
          <input
            type="password"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 8 символов",
              },
              maxLength: {
                value: 16,
                message: "Макисмальная длина пароля 16 символов",
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

        <button className={styles.regButton} type="submit">
          Зарегистрироваться
        </button>
        <div className={styles.ili}>Или</div>
        <Link href="/login" className={styles.enterButton}>
          Войти
        </Link>
      </form>
    </div>
  );
};

export default Registration;
