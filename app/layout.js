import "./globals.css";
import Phone from "@/components/Phone";

export const metadata = {
  title: "Memrise · Korean for real life",
  description: "Week 9 prototype — Memrise rebrand by Jenna Choi",
  appleWebApp: { capable: true, title: "Memrise", statusBarStyle: "default" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f3f4ef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Inter:wght@400;500;600&family=Noto+Sans+KR:wght@400;500;700&display=swap"
        />
      </head>
      <body>
        <Phone>{children}</Phone>
      </body>
    </html>
  );
}
