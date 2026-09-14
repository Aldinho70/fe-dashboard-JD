import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ThemeContext from "../../theme/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export default function Sidebar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsUntilUpdate((seconds) => (seconds === 0 ? 59 : seconds - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="border-b border-[var(--app-background)] shadow-lg shadow-slate-950/30"
      >
        <Toolbar className="flex flex-row items-center justify-between px-4 sm:px-6">
          {/* IZQUIERDA: Brand + Navegación */}
          <div className="flex flex-row items-center gap-6">
            {/* Brand */}
            <div className="flex flex-row items-center gap-3">
              <img
                src="http://ws4cjdg.com/JD.INTEGRACIONES.COM/img/logojd.png"
                width="50"
                alt="Logo Jornada Digital"
                className="rounded-lg p-1 shadow-md shadow-amber-400/10"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-4">
                  <span className="whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-[var(--app-text)]">
                    Jornada Digital®
                  </span>

                  <span className="flex items-center gap-2 rounded-4xl bg-amber-600 px-2.5 py-0 mt-1 text-sm font-medium text-[var(--app-text)]">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                    Telemetria en vivo
                  </span>
                </div>

                <span className="flex flex-row justify-center whitespace-nowrap font-sans font-light tracking-tight text-[var(--app-text)]">
                  Líder en telemetría  -  Dashboard de monitoreo v 1.0
                </span>
              </div>
              {/* <span className=" font-sans font-bold text-xl text-[var(--app-text)] ps-2" > Dashboard </span> */}
            </div>
            
          </div>

          {/* DERECHA: Opciones */}
          <div className="flex flex-row gap-5">

            <div className="hidden md:flex flex-row items-center gap-2">

              <Button className="cursor-pointer !rounded-2xl p-2 !text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 button-radio " 
                disabled
                title="Proximamente"
              >
                <span className="flex flex-row gap-2" >
                  <CircleNotificationsIcon />
                  Notificaciones
                </span>
              </Button>
              {/* <Button color="inherit">Dashboard</Button> */}
              {/* <Button color="inherit">Reportes</Button> */}

              <div className="ml-5 flex items-center gap-3 !shadow-4xl rounded-2xl border border-[var(--app-text)] px-4 py-1 backdrop-blur-md">
                <AutorenewIcon  className="animate-spin text-[var(--app-text)]" />

                <div className="flex flex-col text-right leading-tight">
                  <span className="text-base font-medium text-[var(--app-text)]/80">
                    Próxima actualización
                  </span>

                  <span id="cont-update" className="text-sm font-semibold text-[var(--app-text)]">
                    {secondsUntilUpdate} {secondsUntilUpdate === 1 ? "segundo" : "segundos"}
                  </span>
                </div>
              </div>

            </div>

            <Button
              onClick={toggleTheme}
              title={(darkMode) ? "Cambiar a tema claro" : "Cambiar a tema obscuro"}
              className="cursor-pointer !rounded-2xl p-2 !text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 button-radio gradient-default"
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </Button>
            
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
