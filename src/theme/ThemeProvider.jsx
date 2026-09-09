import { useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import ThemeContext from "./ThemeContext";
import { lightTheme, darkTheme } from "./theme";

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
