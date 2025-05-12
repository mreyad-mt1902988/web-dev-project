
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer>
        <ul className={styles.footerMenu}>
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Contact us</Link></li>
            <li><Link href="#">FAQ</Link></li>
        </ul>
        <p>&copy; 2025. All rights reserved.</p>
    </footer>
  );
}
