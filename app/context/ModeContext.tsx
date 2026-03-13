"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
        mode === "editor" ? "rgba(168,85,247,0.18)" : "rgba(232,41,58,0.18)";

    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
}

export function ModeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const initialMode = pathnameToMode(pathname);
    const [mode, setModeState] = useState<Mode>(initialMode);

    useEffect(() => {
        const syncedMode = pathnameToMode(pathname);
        setModeState(syncedMode);
        document.body.classList.toggle("editor-mode", syncedMode === "editor");
    }, [pathname]);

    const setMode = (newMode: Mode) => {
        if (newMode === mode) return;

        setModeState(newMode);
        document.body.classList.toggle("editor-mode", newMode === "editor");
        triggerModeFlash(newMode);

        if (newMode === "editor") {
            router.push("/editing");
            return;
        }

        router.push("/ti");
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
