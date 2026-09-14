import { useState } from "react";
import TableUnits, { defaultColumns, defaultRows } from "../ui/TableUnits/TableUnits.jsx";
import TableRowsIcon from '@mui/icons-material/TableRows';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useUnitsOffline from "../../hooks/useCountOffline.js";
import useCountUnitsGroups from "../../hooks/useCountUnitsGroup.js";
import OperationGroups from "../OperationGroups/OperationGroups.jsx";
import ButtonOperation from "../ui/ButtonOperation/ButtonOperation.jsx"

function Dashboard() {
  const [tableRows, setTableRows] = useState(defaultRows);
  const [tableColumns, setTableColumns] = useState(defaultColumns);
  const [selectedOperation, setSelectedOperation] = useState("Noelie > unidades sin conexion");
  const { countUnits, loading: loadCountUnis, error: errCountUnits } = useCountUnitsGroups();
  const { unitsOffline: offlineNoelie } = useUnitsOffline('NOELIE');
  const { unitsOffline: offlineDifeyro } = useUnitsOffline('DIFEYRO');
  const { unitsOffline: offlineDifDobles } = useUnitsOffline('00-DIFEYRO SEGURIDAD');
  const { unitsOffline: offlineFilsa } = useUnitsOffline('FILSA');

  const handleClick = ( nameOperation, nameGroup, /*rows = defaultRows, columns = defaultColumns,*/ ) => {
    const rows = [
      { unit: nameGroup, lastMessage: "11/09/26 01:25 pm", direction: "Boulevard revolucion torreon coahuila, mexico", connection: "Online" },
    ];
    setSelectedOperation(`${nameGroup} > ${nameOperation}`);
    setTableRows(rows);
    setTableColumns(columns);
  };

  return (
    <div className="flex flex-col gap-1 min-h-screen w-full" >

      <div className="flex flex-row gap-2 items-start w-full p-2 text-[var(--app-text)]">
        
        {/* Noelie */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Noelie"}>
            <ButtonOperation nameOperation={"Noelie"} length={ countUnits["NOELIE"]  || 0} gradientClass="gradient-green" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png" onClick={() => handleClick("Noelie", "Noelie")}/>
            <ButtonOperation nameOperation={"Sin conexion"} length={ offlineNoelie.length ?? 0 } gradientClass="gradient-sn" type="offline" onClick={() => handleClick("unidades sin conexion", "Noelie")} />
            <ButtonOperation nameOperation={"Desviados"} length={ countUnits["Z - DESVIADOS NOELIE"] } gradientClass="gradient-blue" type="desv" onClick={() => handleClick("Desviados", "Noelie")}/>
            <ButtonOperation nameOperation={"Temperatura"} length={0} gradientClass="gradient-temp"type="tem" onClick={() => handleClick("Temperatura", "Noelie")}/>
          </OperationGroups>
        </div>

        {/* Difeyro */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Difeyro"}>
            <ButtonOperation nameOperation={"Difeyro"} length={ countUnits["DIFEYRO"] || 0 } gradientClass="gradient-purple" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png" onClick={() => handleClick("Difeyro", "Difeyro")}/>
            <ButtonOperation nameOperation={"Sin conexion"} length={ offlineDifeyro.length ?? 0 } gradientClass="gradient-sn" type="offline" onClick={() => handleClick("unidades sin conexion", "Difeyro")} />
            <ButtonOperation nameOperation={"Dobles S/R"} length={ offlineDifDobles.length ?? 0 } gradientClass="gradient-sn" type="offline" onClick={() => handleClick("Dobles S/R", "Difeyro")} />
            <div className="visually-hidden">
              <ButtonOperation nameOperation={""} length={""} />
            </div>
          </OperationGroups>
        </div>

        {/* Filsa */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Filsa"}>
            <ButtonOperation nameOperation={"Filsa"} length={ countUnits["FILSA"] || 0}  gradientClass="gradient-orange" img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png" onClick={() => handleClick("Filsa", "Filsa")}/>
            <ButtonOperation nameOperation={"Sin conexion"} length={ offlineFilsa.length ?? 0 } gradientClass="gradient-sn" type="offline" onClick={() => handleClick("unidades sin conexion", "Filsa")} />
            <ButtonOperation nameOperation={"Desviados"} length={0} gradientClass="gradient-blue" type="desv" onClick={() => handleClick("Desviados", "Filsa")}/>
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
              <ButtonOperation nameOperation={"HRH"} length={0} img="http://ws4cjdg.com/MonitoreoHRH/src/assets/img/logojd.png" onClick={() => handleClick("HRH", "HRH")}/>
              <ButtonOperation nameOperation={"S/Conexion"} length={0} gradientClass="gradient-sn" type="offline" onClick={() => handleClick("S/Conexion", "HRH")}/>
              <ButtonOperation nameOperation={"Mexico"} length={0} onClick={() => handleClick("Mexico", "HRH")} />
              <ButtonOperation nameOperation={"Congelado"} length={0} onClick={() => handleClick("Congelado", "HRH")} />
              <ButtonOperation nameOperation={"Fresco"} length={0} onClick={() => handleClick("Fresco", "HRH")} />
              <ButtonOperation nameOperation={"Foraneas"} length={0} onClick={() => handleClick("Foraneas", "HRH")} />
              <ButtonOperation nameOperation={"Pilgrims"} length={0} onClick={() => handleClick("Pilgrims", "HRH")} />
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
                <span className="font-bold" >{`${selectedOperation}:`}</span>
                <span className="font-bold text-red-600 bg-red-200 px-2 rounded-xl" >{tableRows.length} unidades</span>
              </span>

            </div>
          </legend>
          <TableUnits columns={tableColumns} rows={tableRows} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
