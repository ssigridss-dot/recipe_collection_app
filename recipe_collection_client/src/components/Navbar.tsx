import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
    const {
        darkMode,
        toggleTheme
    } = useTheme();

    return (
        <nav className="navbar">

            <h2>Retseptikogu</h2>

            <div>
                <Link to="/">
                    Retseptid
                </Link>

                <Link to="/create">
                    Lisa retsept
                </Link>

                <button className="theme-button" onClick={toggleTheme}>
                    {darkMode
                        ? "☀ Hele"
                        : "🌙 Tume"}
                </button>
            </div>

        </nav>
    );
}

export default Navbar;