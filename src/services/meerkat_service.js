import axios_service from './axios_service.js'

async function sendCommand(id_unit, cmd) {
    try {
        // const response = await axios_service.post("https://ws.mksmexico.com/Positions/SndCmdExt.php",
        const response = await axios_service.get(`https://ms-wialon-normalizer-production.up.railway.app/wialon/api/send/command/meerkat/${id_unit}/${cmd}`);
        return response;

    } catch (error) {
        console.error(
            "Error en la petición:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export default sendCommand;