import { useContext } from "react";

import { ThemeModeContext } from "./context";

/** The full theme state: the stored preference, what is rendered, and setters. */
export const useThemeMode = () => useContext(ThemeModeContext);
