import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
    const {
        darkMode,
        toggleTheme
    } = useTheme();

    return (
        <nav className="navbar">

            <h2>Recipe Collection</h2>

            <div>
                <Link to="/">
                    Recipes
                </Link>

                <Link to="/create">
                    Add Recipe
                </Link>

                <button className="theme-button" onClick={toggleTheme}>
                    {darkMode
                        ? "☀ Light"
                        : "🌙 Dark"}
                </button>
            </div>

        </nav>
    );
}

export default Navbar;