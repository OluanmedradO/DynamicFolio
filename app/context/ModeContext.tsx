"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect } from "react";

export type Mode = "dev" | "editor";

interface ModeContextType {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType>({
    mode: "dev",
    setMode: () => { },
});

function pathnameToMode(pathname: string): Mode {
    if (pathname.startsWith("/editing")) return "editor";
    return "dev";
}

function triggerModeFlash(mode: Mode) {
    const flash = document.getElementById("modeFlash");
    if (!flash) return;

    flash.style.background =
        mode === "editor" ? "rgba(168,85,247,0.18)" : "rgba(57,255,20,0.2)";

    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
}

export function ModeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const mode = pathnameToMode(pathname);
    const isDevRoute = pathname.startsWith("/dev");
    const isTiRoute = pathname.startsWith("/ti");

    useEffect(() => {
        document.body.classList.toggle("editor-mode", mode === "editor");
        document.body.classList.toggle("dev-mode", isDevRoute && mode === "dev");
        document.body.classList.toggle("ti-mode", isTiRoute && mode === "dev");
    }, [isDevRoute, isTiRoute, mode]);

    const setMode = (newMode: Mode) => {
        if (newMode === mode) return;

        document.body.classList.toggle("editor-mode", newMode === "editor");
        triggerModeFlash(newMode);

        if (newMode === "editor") {
            router.push("/editing");
            return;
        }

        router.push("/dev");
    };

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    return useContext(ModeContext);
}
