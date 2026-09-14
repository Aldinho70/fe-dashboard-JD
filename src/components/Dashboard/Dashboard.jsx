import { useEffect, useState } from "react";
import useCountHRH from "../../hooks/useCountHRH.js";
import TableUnits from "../ui/TableUnits/TableUnits.jsx";
import useOfflineHRH from "../../hooks/useOfflineHRH.js";
import TableRowsIcon from "@mui/icons-material/TableRows";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useUnitsOffline from "../../hooks/useCountOffline.js";
import dashboardHelper from "../../helpers/Dashboard.helper.js";
import useCountUnitsGroups from "../../hooks/useCountUnitsGroup.js";
import OperationGroups from "../OperationGroups/OperationGroups.jsx";
import ButtonOperation from "../ui/ButtonOperation/ButtonOperation.jsx";
import Loading from "../ui/Loading/Loading.jsx";

function Dashboard() {
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState("");
  const { countUnits, loading: loadingUnits } = useCountUnitsGroups();
  const { unitsOffline: offlineNoelie, loading: loadingNoelie } = useUnitsOffline("NOELIE");
  const { unitsOffline: offlineDifeyro, loading: loadingDifeyro } = useUnitsOffline("DIFEYRO");
  const { unitsOffline: offlineDifDobles, loading: loadingDifDobles } = useUnitsOffline("00-DIFEYRO SEGURIDAD",);
  const { unitsOffline: offlineFilsa, loading: loadingFilsa } = useUnitsOffline("FILSA");
  const { unitsOffline: offlineHRH, loading: loadingOfflineHRH } = useOfflineHRH("GRUPO HRH");
  const [dismissedOfflineAlerts, setDismissedOfflineAlerts] = useState(new Set());
  const [loadingTable, setLoadingTable] = useState(false);

  const { dataHRH, loading: loadingHRH } = useCountHRH();
  const loadingButtons = loadingUnits || loadingNoelie || loadingDifeyro || loadingDifDobles
    || loadingFilsa || loadingOfflineHRH || loadingHRH;

  useEffect(() => {
    setDismissedOfflineAlerts(new Set());
  }, [offlineNoelie, offlineDifeyro, offlineDifDobles, offlineFilsa, offlineHRH]);

  const dismissOfflineAlert = (idButton) => {
    setDismissedOfflineAlerts((dismissedAlerts) => {
      const nextDismissedAlerts = new Set(dismissedAlerts);
      nextDismissedAlerts.add(idButton);
      return nextDismissedAlerts;
    });
  };

  const handleClickNDF = async ( nameOperation, nameGroup, idButton = null, data = null, ) => {

    if( idButton ){
      dismissOfflineAlert(idButton);
    }

    setLoadingTable(true);

    try {
      const { rows, columns } = await dashboardHelper.createContentTable(
        nameOperation,
        nameGroup,
        data,
      );

      setSelectedOperation(`: ${nameGroup} > ${nameOperation}`);
      setTableRows(rows);
      setTableColumns(columns);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleClickHRH = async ( nameOperation, nameGroup, idButton = null, data = null, ) => {
    
    if( idButton ){
      dismissOfflineAlert(idButton);
    };

    setLoadingTable(true);

    try {
      const { rows, columns } = await dashboardHelper.createContentTableHRH(
        nameOperation,
        nameGroup,
        data,
      );

      setSelectedOperation(`${nameGroup} > ${nameOperation}`);
      setTableRows(rows);
      setTableColumns(columns);
    } finally {
      setLoadingTable(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 min-h-screen w-full">
      <div className="relative">
        {loadingButtons && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-2">
            <Loading message="Cargando información de los botones..." />
          </div>
        )}

        <div className={`flex flex-row gap-2 items-start w-full p-2 text-[var(--app-text)] transition-opacity duration-200 ${loadingButtons ? "pointer-events-none opacity-50" : ""}`}>
        {/* Noelie */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Noelie"}>
            <ButtonOperation
              nameOperation={"Noelie"}
              length={countUnits["NOELIE"] || 0}
              gradientClass="gradient-green"
              img="../logojd.png"
              onClick={() => handleClickNDF("General", "NOELIE")}
            />
            <ButtonOperation
              id="btn-offline-noelie"
              nameOperation={"Sin conexion"}
              length={offlineNoelie.length ?? 0}
              gradientClass={offlineNoelie.length > 0 && !dismissedOfflineAlerts.has("btn-offline-noelie") ? "gradient-sn-animation" : "gradient-sn"}
              type="offline"
              onClick={() =>
                handleClickNDF("Unidades sin conexion", "Noelie", "btn-offline-noelie", offlineNoelie)
              }
            />
            <ButtonOperation
              nameOperation={"Desviados"}
              length={countUnits["Z - DESVIADOS NOELIE"]}
              gradientClass="gradient-blue"
              type="desv"
              onClick={() =>
                handleClickNDF("Desviados", "Z - DESVIADOS NOELIE")
              }
            />
            <ButtonOperation
              nameOperation={"Temperatura"}
              length={0}
              gradientClass="gradient-temp"
              type="tem"
              onClick={() => handleClickNDF("Temperatura", "NOELIE")}
            />
          </OperationGroups>
        </div>

        {/* Difeyro */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Difeyro"}>
            <ButtonOperation
              nameOperation={"Difeyro"}
              length={countUnits["DIFEYRO"] || 0}
              gradientClass="gradient-purple"
              img="../logojd.png"
              onClick={() => handleClickNDF("General", "DIFEYRO")}
            />
            <ButtonOperation
              id="btn-offline-difeyro"
              nameOperation={"Sin conexion"}
              length={offlineDifeyro.length ?? 0}
              gradientClass={offlineDifeyro.length > 0 && !dismissedOfflineAlerts.has("btn-offline-difeyro") ? "gradient-sn-animation" : "gradient-sn"}
              type="offline"
              onClick={() =>
                handleClickNDF( "unidades sin conexion", "Difeyro", "btn-offline-difeyro", offlineDifeyro, )
              }
            />
            <ButtonOperation
              id="btn-offline-doble-difeyro"
              nameOperation={"Dobles S/R"}
              length={offlineDifDobles.length ?? 0}
              gradientClass={offlineDifDobles.length > 0 && !dismissedOfflineAlerts.has("btn-offline-doble-difeyro") ? "gradient-sn-animation" : "gradient-sn"}
              type="offline"
              onClick={() =>
                handleClickNDF("Dobles S/R", "Difeyro", "btn-offline-doble-difeyro", offlineDifDobles)
              }
            />
            <div className="visually-hidden">
              <ButtonOperation nameOperation={""} length={""} />
            </div>
          </OperationGroups>
        </div>

        {/* Filsa */}
        <div className="flex-1 min-w-0">
          <OperationGroups nameGroup={"Filsa"}>
            <ButtonOperation
              nameOperation={"Filsa"}
              length={countUnits["FILSA"] || 0}
              gradientClass="gradient-orange"
              img="../logojd.png"
              onClick={() => handleClickNDF("General", "FILSA")}
            />
            <ButtonOperation
              id="btn-offline-filsa"
              nameOperation={"Sin conexion"}
              length={offlineFilsa.length ?? 0}
              gradientClass={offlineFilsa.length > 0 && !dismissedOfflineAlerts.has("btn-offline-filsa") ? "gradient-sn-animation" : "gradient-sn"}
              type="offline"
              onClick={() =>
                handleClickNDF("unidades sin conexion", "Filsa", "btn-offline-filsa", offlineFilsa)
              }
            />
            <ButtonOperation
              nameOperation={"Desviados"}
              length={0}
              gradientClass="gradient-blue"
              type="desv"
              onClick={() => handleClickNDF("Desviados", "FILSA_desviados")}
            />
            <div className="visually-hidden">
              <ButtonOperation nameOperation={""} length={""} />
            </div>
          </OperationGroups>
        </div>

        {/* HRH */}
        <div className="flex-2 min-w-0 ">
          <fieldset className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-2 shadow-xl shadow-slate-950/20 backdrop-blur-sm">
            <legend className="px-3">
              <span className="inline-block rounded-xl border border-[var(--accent)]/20 bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]">
                HRH
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-3 p-3">
              <ButtonOperation
                nameOperation="HRH"
                length={dataHRH["GRUPO HRH"]?.units?.length ?? 0}
                img={
                  dataHRH["GRUPO HRH"]?.icon
                    ? `https://hst-api.wialon.com${dataHRH["GRUPO HRH"].icon}`
                    : "../logojd.png"
                }
                onClick={() => handleClickHRH("General", "GRUPO HRH")}
              />

              <ButtonOperation
                id="btn-offline-hrh"
                nameOperation="S/Conexion"
                length={offlineHRH.length ?? 0}
                gradientClass={offlineHRH.length > 0 && !dismissedOfflineAlerts.has("btn-offline-hrh") ? "gradient-sn-animation" : "gradient-sn"}
                type="offline"
                onClick={() => handleClickHRH("S/Conexion", "GRUPO_HRH", "btn-offline-hrh", offlineHRH)}
              />

              <ButtonOperation
                nameOperation="Mexico"
                length={dataHRH["03-CARGAS MEXICO"]?.units?.length ?? 0}
                img={"../logojd.png"}
                onClick={() => handleClickHRH("Mexico", "03-CARGAS MEXICO")}
              />

              <ButtonOperation
                nameOperation="Congelado"
                length={dataHRH["04-CONGELADO"]?.units?.length ?? 0}
                img={"../logojd.png"}
                onClick={() => handleClickHRH("Congelado", "04-CONGELADO")}
              />

              <ButtonOperation
                nameOperation="Fresco"
                length={dataHRH["05-FRESCO"]?.units?.length ?? 0}
                img={ "../logojd.png"}
                onClick={() => handleClickHRH("Fresco", "05-FRESCO")}
              />

              <ButtonOperation
                nameOperation="Foraneas"
                length={dataHRH["03-CARGAS FORANEAS"]?.units?.length ?? 0}
                img={
                  dataHRH["03-CARGAS FORANEAS"]?.icon
                    ? `https://hst-api.wialon.com${dataHRH["03-CARGAS FORANEAS"].icon}`
                    : "../logojd.png"
                }
                onClick={() => handleClickHRH("Foraneas", "03-CARGAS FORANEAS")}
              />

              <ButtonOperation
                nameOperation="Cajas"
                length={dataHRH["HRH CAJAS"]?.units?.length ?? 0}
                img={
                  dataHRH["Cajas"]?.icon
                    ? `https://hst-api.wialon.com${dataHRH["HRH CAJAS"].icon}`
                    : "../logojd.png"
                }
                onClick={() => handleClickHRH("Cajas", "HRH CAJAS")}
              />

              <ButtonOperation
                nameOperation="Dobles"
                length={dataHRH["HRH SEGURIDAD"]?.units?.length ?? 0}
                img={
                  dataHRH["Dobles"]?.icon
                    ? `https://hst-api.wialon.com${dataHRH["HRH SEGURIDAD"].icon}`
                    : "../logojd.png"
                }
                onClick={() => handleClickHRH("Dobles", "HRH SEGURIDAD")}
              />
            </div>
          </fieldset>
        </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col flex-1 w-full">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] pb-1 px-2 shadow-2xl shadow-slate-950/20 backdrop-blur-sm">
          <legend className="py-2">
            <div className="flex flex-row items-center">
              <span className="flex flex-row items-center gap-2 rounded-xl border border-[var(--app-background)]/20 bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]">
                <TableRowsIcon />
                Tabla de unidades
              </span>

              <span className="flex flex-row ms-3 px-5 py-1 gap-1 items-center rounded-4xl bg-[var(--app-background)]">
                <FilterAltIcon />
                Mostrando
                <span className="font-bold">{`${selectedOperation}:`}</span>
                <span className="font-bold text-red-600 bg-red-200 px-2 rounded-xl">
                  {tableRows?.length ?? 0} unidades
                </span>
              </span>
            </div>
          </legend>
          <div className="relative">
            {loadingTable && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                <Loading message="Cargando datos en la tabla..." />
              </div>
            )}
            <TableUnits columns={tableColumns} rows={tableRows} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
