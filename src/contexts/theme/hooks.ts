import { useContext } from "react";

import { ThemeModeContext } from "./context";

export const useThemeMode = () => {
    const { toggleTheme } = useContext(ThemeModeContext);
    return { toggleTheme };
};
