import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Retseptikogu</h2>

            <div>
                <Link to="/">Retseptid</Link>

                <Link to="/create">
                    Lisa retsept
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;