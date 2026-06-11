import { Link, NavLink, useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget";
import "./NavBar.css";

const CATEGORIES = [
  { id: "audio", label: "Audio" },
  { id: "periféricos", label: "Periféricos" },
  { id: "monitores", label: "Monitores" },
  { id: "accesorios", label: "Accesorios" },
  { id: "mobiliario", label: "Mobiliario" },
];

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⬡</span>
          <span className="navbar__logo-text">NEXUS<span>STORE</span></span>
        </Link>

        <nav className="navbar__nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Todos
          </NavLink>
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.id}`}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {cat.label}
            </NavLink>
          ))}
        </nav>

        <CartWidget />
      </div>
    </header>
  );
}
