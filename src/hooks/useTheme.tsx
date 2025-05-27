import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Verifica se já tem tema salvo no localStorage
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme) {
            setTheme(storedTheme);
            applyTheme(storedTheme);
        } else {
            const defaultTheme = prefersDark ? "dark" : "light";
            setTheme(defaultTheme);
            applyTheme(defaultTheme);
        }
    }, []);

    function applyTheme(theme: "light" | "dark") {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }

    function changeTheme(newTheme: "light" | "dark") {
        setTheme(newTheme);
        applyTheme(newTheme);
    }

    return { theme, changeTheme };
}
