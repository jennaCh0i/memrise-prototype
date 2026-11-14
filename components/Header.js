import Avatar from "./Avatar";

export default function Header({ title, children }) {
  return (
    <header className="pad top-space">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em" }}>memrise</span>
        <Avatar src="/images/me.jpg" initials="ME" size={44} color="var(--yellow)" />
      </div>
      {title && <h1 className="t-display" style={{ marginTop: 20 }}>{title}</h1>}
      {children}
    </header>
  );
}
