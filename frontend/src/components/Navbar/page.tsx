"use client";

import Search from "@/UI/Search/page";
import styles from "./Navbar.module.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  path: string | null;
}

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Главная", path: "/" },
    { name: "Скидки", path: "/sales" },
    { name: "Популярные", path: "/popular" },
    { name: "Поиск", path: null },
    { name: "Избранное", path: "/favourites" },
    { name: "Мои покупки", path: "/purchases" },
  ];

  const handleItemHover = (item: string | null) => {
    setActiveItem(item);
  };

  const renderNavItem = (item: NavItem) => {
    if (item.name === "Поиск") {
      return <Search />;
    }

    return (
      <Link
        href={item.path || "/"}
        className={styles.navLink}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logoLink}>
        <h1 className={styles.logo}>
          Play<span>Store</span>
        </h1>
      </Link>

      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`${styles.navItem} ${
                  pathname === item.path ? styles.active : ""
                } ${activeItem === item.name ? styles.hovered : ""}`}
                onMouseEnter={() => handleItemHover(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {renderNavItem(item)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;