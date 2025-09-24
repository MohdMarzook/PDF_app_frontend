import Navbar from "../components/navbar";
import "./globals.css";

export const metadata = {
  title: "PDF Translator",
  description: "Translate PDFs without breaking the layout. This full-stack app preserves original formatting using a powerful, cloud-native microservices architecture built with Java, Python, and Docker for reliability.",
  image: "/image.png",
};

export default function RootLayout({ children }) {
  return (
    <html className="dark" lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
