import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("theme")
            === "dark"
        );

    useEffect(() => {

        document.body.className =
            darkMode
                ? "dark-theme"
                : "light-theme";

        localStorage.setItem(
            "theme",
            darkMode
                ? "dark"
                : "light"
        );

    }, [darkMode]);

    const toggleTheme = () => {

        setDarkMode(
            previous => !previous
        );

    };

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    );
}