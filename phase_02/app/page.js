import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <Header />
      
      <Footer />
    </div>
  );
}
