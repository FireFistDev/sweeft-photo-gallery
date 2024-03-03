import { Link } from "react-router-dom";
import "../index.css"; // Import your CSS file

export default function Nav() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Main
      </Link>
      <Link to="/history" className="nav-link">
        History
      </Link>
    </nav>
  );
}
