import { Montserrat } from "next/font/google";
import "./styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Main page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        {children}
        <script src="https://kit.fontawesome.com/930a2eb052.js" crossOrigin="anonymous" async></script>
      </body>
    </html>
  );
}
