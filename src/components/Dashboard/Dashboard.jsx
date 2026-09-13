import TableUnits from "../ui/TableUnits/TableUnits.jsx";
import TableRowsIcon from '@mui/icons-material/TableRows';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import OperationGroups from "../OperationGroups/OperationGroups.jsx";
import ButtonOperation from "../ui/ButtonOperation/ButtonOperation.jsx"

function Dashboard() {
  return (
    <div className="flex flex-col gap-1 min-h-screen w-full" >

      <div className="flex flex-row gap-2 items-start w-full p-2 text-[var(--app-text)]">
        {/* Noelie */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Noelie"}>
            <ButtonOperation nameOperation={"Noelie"} length={0} gradientClass="gradient-green" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png"/>
            <ButtonOperation nameOperation={"Sin conexion"} length={0} gradientClass="gradient-sn" type="offline" />
            <ButtonOperation nameOperation={"Desviados"} length={0} gradientClass="gradient-blue" type="desv"/>
            <ButtonOperation nameOperation={"Temperatura"} length={0} gradientClass="gradient-temp"type="tem"/>
          </OperationGroups>
        </div>

        {/* Difeyro */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Difeyro"}>
            <ButtonOperation nameOperation={"Difeyro"} length={0} gradientClass="gradient-purple" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png"/>
            <ButtonOperation nameOperation={"Sin conexion"} length={0} gradientClass="gradient-sn" type="offline" />
            <ButtonOperation nameOperation={"Dobles S/R"} length={0} gradientClass="gradient-sn" type="offline" />
            <div className="visually-hidden">
              <ButtonOperation nameOperation={""} length={""} />
            </div>
          </OperationGroups>
        </div>

        {/* Filsa */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Filsa"}>
            <ButtonOperation nameOperation={"Filsa"} length={0} gradientClass="gradient-orange" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png"/>
            <ButtonOperation nameOperation={"Sin conexion"} length={0} gradientClass="gradient-sn" type="offline" />
            <ButtonOperation nameOperation={"Desviados"} length={0} gradientClass="gradient-blue" type="desv"/>
            <div className="visually-hidden">
              <ButtonOperation nameOperation={""} length={""} />
            </div>
          </OperationGroups>  
        </div>

        {/* HRH */}
        <div className="flex-2 min-w-0 ">
          <fieldset className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-2 shadow-xl shadow-slate-950/20 backdrop-blur-sm" >
            <legend className="px-3">
              <span className="inline-block rounded-xl border border-[var(--accent)]/20 bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]" >
                HRH
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-3 p-3">
              <ButtonOperation nameOperation={"HRH"} length={0} img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png"/>
              <ButtonOperation nameOperation={"S/Conexion"} length={0} gradientClass="gradient-sn" type="offline"/>
              <ButtonOperation nameOperation={"Mexico"} length={0} />
              <ButtonOperation nameOperation={"Congelado"} length={0} />
              <ButtonOperation nameOperation={"Fresco"} length={0} />
              <ButtonOperation nameOperation={"Foraneas"} length={0} />
              <ButtonOperation nameOperation={"Pilgrims"} length={0} />
              <div className="visually-hidden">
                <ButtonOperation nameOperation={""} length={""} />
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col flex-1 w-full">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] pb-1 px-2 shadow-2xl shadow-slate-950/20 backdrop-blur-sm">
          <legend className="py-2">
            <div className="flex flex-row items-center" >

              <span className="flex flex-row items-center gap-2 rounded-xl border border-[var(--app-background)]/20 bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]" >
                <TableRowsIcon />
                Tabla de unidades
              </span>

              <span className="flex flex-row ms-3 px-5 py-1 gap-1 items-center rounded-4xl bg-[var(--app-background)]" > 
                <FilterAltIcon />
                Mostrando: 
                <span className="font-bold" >{`Noelie > unidades sin conexion:`}</span> 
                <span className="font-bold text-red-600 bg-red-200 px-2 rounded-xl" >5 unidades</span> 
              </span>

            </div>
          </legend>
          <TableUnits />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
