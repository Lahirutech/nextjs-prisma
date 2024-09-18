"use client"
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          YourLogo
        </Link>
        <div
          className={`${styles.navbarBurger} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${styles.navbarMenu} ${isOpen ? styles.active : ""}`}>
          <li>
            <Link href="/" className={styles.navbarItem}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navbarItem}>
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className={styles.navbarItem}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navbarItem}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
