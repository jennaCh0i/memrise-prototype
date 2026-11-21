// Web app manifest: the whole site is the app, so iOS keeps every tab inside the
// home-screen app instead of opening Safari for "/flashcards" or "/community".
export default function manifest() {
  return {
    name: "Memrise · Korean for real life",
    short_name: "Memrise",
    id: "/",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    background_color: "#f7f6f2",
    theme_color: "#ffcf00",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
