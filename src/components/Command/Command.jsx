import * as React from "react";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import sendCommand from "../../services/meerkat_service.js";

const COMANDOS = [
  { value: "1", label: "Reset" },
  { value: "2", label: "Paro de motor" },
  { value: "3", label: "Quitar paro de motor" },
];

function Command({ name, fields }) {
  const IDMET = fields.find((field) => field.name == "IDMET");

  const [command, setCommand] = React.useState("");
  const [enviando, setEnviando] = React.useState(false);
  const [respuesta, setRespuesta] = React.useState(null);

  const handleChange = (event) => {
    setCommand(event.target.value);
  };

  const handleEnviar = async () => {
    if (!command) return;

    const command_select = COMANDOS.find((c) => c.value === command);
    setEnviando(true);
    setRespuesta(null);

    try {
      const confirmado = window.confirm(`¿Estás seguro de enviar el comando (${command_select.label}) a la unidad (${name}) ?`);
      if (!confirmado) return; // si cancela, no continúa con el envío
      
      const response = await sendCommand(IDMET.value, command_select.value);
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulación

      setRespuesta({
        tipo: "success",
        texto: `Comando "${command_select.label} [${IDMET.value}]" enviado correctamente a la Unidad ${name}.`,
        response_meerkat_service: response,
      });
    } catch (error) {
      setRespuesta({
        tipo: "error",
        texto: "No se pudo enviar el comando. Intenta de nuevo.",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex gap-3 justify-between items-center">
          <span className="font-bold text-2xl pb-1 text-gray-100">
            Envío de comandos
          </span>
        </div>

        <div className="flex flex-col w-full h-full items-start bg-gray-700 rounded-3xl overflow-hidden">
          {/* form */}
          <div className="flex flex-wrap w-full items-center m-3 gap-4 bg-gray-800/60 p-4 rounded-2xl">
            <div className="flex flex-row gap-2 items-center text-base">
              <span className="font-medium text-gray-400">
                Unidad a enviar comando
              </span>
              <span className="font-semibold text-gray-100 bg-gray-600 px-3 py-1 rounded-lg">
                {`${name} [${IDMET.value}]`}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 items-center border-s-2 border-gray-600 ps-5">
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel
                  id="comando-label"
                  sx={{ color: "rgb(156 163 175)" }}
                >
                  Selecciona un comando
                </InputLabel>
                <Select
                  labelId="comando-label"
                  id="comando-select"
                  value={command}
                  label="Selecciona un comando"
                  onChange={handleChange}
                  sx={{ borderRadius: "0.75rem" }}
                >
                  {COMANDOS.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleEnviar}
                disabled={!command || enviando}
                sx={{
                  borderRadius: "0.75rem",
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                }}
              >
                {enviando ? "Enviando..." : "Enviar comando"}
              </Button>
            </div>
          </div>

          {/* campo de respuesta */}
          <div className="flex-1 w-full bg-gray-800/40 rounded-3xl mx-3 mb-3 p-4">
            {respuesta ? (
              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  respuesta.tipo === "success"
                    ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700"
                    : "bg-red-900/40 text-red-300 border border-red-700"
                }`}
              >
                {respuesta.texto}
                <hr className="my-3"/>
                {`Respuesta de meerkat api: ${respuesta.response_meerkat_service}`}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">
                Aquí aparecerá la respuesta del comando enviado.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Command;
