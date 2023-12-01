export const POSEIDON_THEME = "poseidon_theme";

export function getThemeKey() {
    const localTheme = window.localStorage.getItem(POSEIDON_THEME);
    return localTheme || "auto";
}

export function setThemeKey(val: string) {
    window.localStorage.setItem(POSEIDON_THEME, val);
}

export function needSetTheme(val: string) {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    if (val !== "auto") {
        return val;
    } else if (darkThemeMq.matches) {
        return "dark";
    } else {
        return "light";
    }
}