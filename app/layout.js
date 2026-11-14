import "./globals.css";
import { AppState } from "@/components/AppState";

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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Newsreader:opsz,wght@6..72,400&family=Noto+Sans+KR:wght@400;500&display=swap"
        />
      </head>
      <body>
        <AppState>
          <main className="stage">
            <div className="phone">{children}</div>
          </main>
        </AppState>
      </body>
    </html>
  );
}
