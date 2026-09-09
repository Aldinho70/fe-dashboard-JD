import { useContext } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

import ThemeContext from "../../theme/ThemeContext";

export default function Sidebar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-row items-center justify-between">
          {/* IZQUIERDA: Brand + Navegación */}
          <div className="flex flex-row items-center gap-6">
            {/* Brand */}
            <div className="flex flex-row items-center gap-3">
              <img
                src="http://ws4cjdg.com/JD.INTEGRACIONES.COM/img/logojd.png"
                width="30"
                alt="Logo Jornada Digital"
              />
              <Typography
                variant="h6"
                component="div"
                className="whitespace-nowrap"
              >
                Jornada Digital
              </Typography>
            </div>

            {/* Links de navegación (se ocultan en móvil) */}
            {/* <div className="hidden md:flex flex-row items-center gap-1">
              <Button color="inherit">Inicio</Button>
              <Button color="inherit">Dashboard</Button>
              <Button color="inherit">Reportes</Button>
            </div> */}
          </div>

          {/* DERECHA: Opciones */}
          <div className="flex flex-row items-center gap-2">
            <Button
              color="inherit"
              startIcon={<SettingsBrightnessIcon />}
              onClick={toggleTheme}
            >
              {darkMode ? "Tema claro" : "Tema oscuro"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
