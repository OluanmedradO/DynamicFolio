import type { Language } from "../context/LanguageContext";

export const EN_PREFIX = "/en";

export function getLanguageFromPathname(pathname: string | null | undefined): Language {
    return pathname === EN_PREFIX || pathname?.startsWith(`${EN_PREFIX}/`) ? "en" : "pt";
}

export function stripLocalePrefix(pathname: string): string {
    if (pathname === EN_PREFIX) return "/";
    if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length) || "/";
    return pathname || "/";
}

export function localizePath(path: string, lang: Language): string {
    if (!path || path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
        return path;
    }

    const [pathWithQuery, hash] = path.split("#");
    const [basePath, query] = pathWithQuery.split("?");
    const normalizedBase = stripLocalePrefix(basePath || "/");
    const localizedBase = lang === "en"
        ? normalizedBase === "/" ? EN_PREFIX : `${EN_PREFIX}${normalizedBase}`
        : normalizedBase;
    const queryPart = query ? `?${query}` : "";
    const hashPart = hash ? `#${hash}` : "";

    return `${localizedBase}${queryPart}${hashPart}`;
}
