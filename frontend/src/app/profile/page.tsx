import styles from "./Profile.module.css";
import Image from "next/image";
import avatarr from "../../../public/picture.jpg";

const Profile = () => {
  const user = {
    avatar: avatarr,
    nickname: "M.Ugway",
    email: "test@yandex.ru",
    purchases: [
      { id: 1, name: "Игра 1", date: "2023-10-01", price: "500 ₽" },
      { id: 2, name: "Игра 2", date: "2023-09-15", price: "700 ₽" },
      { id: 3, name: "Игра 3", date: "2023-08-20", price: "300 ₽" },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <div className={styles.profileHeader}>
          <Image
            src={user.avatar}
            width={100}
            height={100}
            alt="Аватар"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <h1 className={styles.nickname}>{user.nickname}</h1>
            <p className={styles.email}>{user.email}</p>
          </div>
        </div>

        <div className={styles.purchasesSection}>
          <h2 className={styles.sectionTitle}>Мои покупки</h2>
          <div className={styles.purchasesList}>
            {user.purchases.map((purchase) => (
              <div key={purchase.id} className={styles.purchaseItem}>
                <div className={styles.purchaseDetails}>
                  <h3 className={styles.purchaseName}>{purchase.name}</h3>
                  <p className={styles.purchaseDate}>{purchase.date}</p>
                </div>
                <p className={styles.purchasePrice}>{purchase.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
