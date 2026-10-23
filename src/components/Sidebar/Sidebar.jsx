import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import BasicKpi from "../shared/BasicKpi";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import ThemeContext from "../../theme/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
                src="../logojd.png"
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
            </div>
            
          </div>

          <div className="flex gap-3 items-center" >
            
            <div role="search" className="flex min-w-0 items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--app-background)]/70 px-3 py-2 shadow-inner shadow-black/10">
              <label htmlFor="unit-search" className="whitespace-nowrap text-sm font-semibold text-[var(--muted-text)]">
                Buscar unidad
              </label>

              <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] px-3 py-1.5 transition-colors focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
                <SearchIcon aria-hidden="true" className="shrink-0 text-[var(--muted-text)]" fontSize="small" />
                <input id="unit-search" type="search" placeholder="Nombre o ID" className="w-28 min-w-0 bg-transparent text-sm text-[var(--app-text)] outline-none placeholder:text-[var(--muted-text)] sm:w-36"/>
              </div>
              <Button type="button" variant="contained" startIcon={<SearchIcon />} className="!rounded-xl !px-3 !py-2 !text-sm !font-semibold !normal-case !shadow-none">
                Buscar
              </Button>
            </div>

            <div aria-label="Resumen general de unidades" className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--app-background)]/70 px-2.5 py-1.5 shadow-sm shadow-black/10">
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wide text-[var(--muted-text)]">
                Resumen general
              </span>
              <div className="flex items-center gap-1.5">
                <BasicKpi name={'Total unides'} value={0} />
                <BasicKpi name={'En linea'} value={0} color={'green'}/>
                <BasicKpi name={'Sin conexion'} value={0} color={'red'}/>
              </div>
            </div>
          </div>

          {/* DERECHA: Opciones */}
          <div className="flex flex-row gap-5">

            {/* Notificaciones */}
            <div className="hidden md:flex flex-row items-center gap-2">

              {/* <Button className="cursor-pointer !rounded-2xl p-2 !text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 button-radio " 
                disabled
                title="Proximamente"
              >
                <span className="flex flex-row gap-2" >
                  <CircleNotificationsIcon />
                  Notificaciones
                </span>
              </Button> */}
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

            <Button onClick={toggleTheme} title={(darkMode) ? "Cambiar a tema claro" : "Cambiar a tema obscuro"} className="cursor-pointer !rounded-2xl p-2 !text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 button-radio gradient-default">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </Button>
            
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
