import axios_service from './axios_service.js'

async function sendCommand(id_unit, cmd) {
    const body = {
        idCtm:"551",
        idTra: id_unit,
        idCmd: cmd,
        idUsr:"Jornada Digital",
        idTer:"PC10",
        idPgm:"Monitoreo JD"
    };

    try {
        const response = await axios_service.post("https://ws.mksmexico.com/Positions/SndCmdExt.php",
            body,
            {
                headers: { "Content-Type": "application/json" },
                auth: {
                    username: 'Difeyro1',
                    password: '47a545bbced597d7f2666211994c1'
                }
            }
        );
        return response.data;

    } catch (error) {
        console.error(
            "Error en la petición:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export default sendCommand;