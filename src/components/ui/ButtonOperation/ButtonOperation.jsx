import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import BusAlertIcon from '@mui/icons-material/BusAlert';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ThermostatTwoToneIcon from '@mui/icons-material/ThermostatTwoTone';

function CardOperation({ id, nameOperation, length, gradientClass = "", onClick, type="", img = null, textDescription = ''}) {

  const operationTypes = {
    offline: {
      icon: <BusAlertIcon />,
      classCss: "!bg-red-500",
      classTextColor: "!text-red-500",
      label: "Offline",
    },
    
    tem: {
      icon: <ThermostatTwoToneIcon />,
      classCss: "!bg-sky-400",
      classTextColor: "!text-sky-400",
      label: "Temperatura",
    },

    desv: {
      icon: <AltRouteIcon />,
      classCss: "!bg-indigo-700",
      classTextColor: "!text-indigo-700",
      label: "Desviación",
    },
    
    default: {
      icon: <Brightness1Icon />,
      classTextColor: "!text-[var(--app-text)]",
      classCss: "!bg-white/15",
      label: "default",
    },
  };

  const operation = operationTypes[type] ?? operationTypes.default;

  return (
    <Button onClick={onClick}
      className={`w-full cursor-pointer overflow-hidden p-0 !rounded-lg text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 button-radio ${(gradientClass) && gradientClass || 'gradient-default' }`}
      id={id}
    >
      <div className="flex w-full items-center gap-2 px-1 py-1">
        <div className="flex flex-row justify-start gap-1" >
          <span className="relative flex h-10 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full ${ (operation.classCss) } opacity-75`}></span>
          </span>
          <Avatar
            variant="square"
            className={`h-9 w-9 !rounded-lg p-1 ${ (operation.classCss) } ` }
          >
            {img
              ? (
                  <img
                    src={img}
                    alt=""
                  />
                )
              : operation.icon
            }
          </Avatar>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
          <div className="flex flex-col gap-0" >
            <span className="min-w-0 truncate text-left text-lg font-bold text-[var(--app-text)]">
              {nameOperation}
            </span>
            <span className={`min-w-0 truncate text-left font-medium text-xs ${ (operation.classTextColor) }`}  >
              {textDescription} 
            </span>
          </div>

          <span className="shrink-0 rounded-lg border border-[var(--app-text)] bg-white px-2.5 py-1 text-lg font-bold text-gray-900">
            {length}
          </span>
        </div>
      </div>
    </Button>
  );
}

export default CardOperation;