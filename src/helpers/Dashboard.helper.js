import { parseTimestamp } from "../parsers/timestamp.parser";
import api_jd_wialon_service from "../services/api_jd_wialon_service";

const dashboardHelper = {

    async createContentTable( operation, group, data = null ) {
        let units = [];

        if( !data && operation != 'Temperatura' ){
            const dataGroup = await api_jd_wialon_service.getGroup( group );
            
            units = dataGroup[0]?.units ?? [];
        } else if( operation == 'Temperatura' ){
            units = [];
        }
        else{
            units = data;
        }

        const rows = units.map( unit => {
            const { last_message, fields } = unit;
            return{
                unit: unit.name,
                unit_id: unit.id,
                lastMessage: parseTimestamp( last_message.timestamp ),
                last_message,
                fields,
                direction: 'Ruta desconocida',
                connection: 'Conexion desconocida',
                sendComand: ( operation == 'Costco' ) ? true : false,
            }
        })

        return{
            rows,
            columns: [
                { id: "unit", label: "Unidad" },
                { id: "lastMessage", label: "Ultimo mensaje" },
                { id: "direction", label: "Direccion" },
                { id: "connection", label: "Conexion" },
                { id: "handleActions", label: "Acciones" },
            ],
        }
    },

    async createContentTableHRH( operation, group, data = null ) {
        let units = [];

        if( !data ){
            const dataGroup = await api_jd_wialon_service.getGroup( group, 'HRH' );
            units = dataGroup[0]?.units ?? [];
        } else {
            units = data;
        }

        const rows = units.map( unit => {
            const { last_message } = unit;
            return{
                unit: unit.name,
                lastMessage: parseTimestamp( last_message.timestamp ),
                direction: 'Ruta desconocida',
                connection: 'Desconocido',

            }
        })

        return{
            rows,
            columns: [
                { id: "unit", label: "Unidad" },
                { id: "lastMessage", label: "Ultimo mensaje" },
                { id: "direction", label: "Direccion" },
                { id: "connection", label: "Conexion" },
                { id: "handleActions", label: "Acciones" },
            ],
        }
    },

    async createContentTableTemperatura( group, data = null ) {
        const rows = ( data ?? [] ).map( (unit) => {
            const { _parameters = [] } = unit;

            const parameters = _parameters.reduce( (acc, param, index) => {
                acc[`param${index}`] = param.value;
                return acc;
            }, {} );

            return {
                unit: unit.name,
                ...parameters,
            }
        })

        const temperatureCount = rows.reduce( (max, row) => {
            const count = Object.keys( row ).filter( key => key.startsWith( 'param' ) ).length;
            return Math.max( max, count );
        }, 0 );

        return{
            rows,
            columns: [
                { id: "unit", label: "Unidad" },
                ...Array.from( { length: temperatureCount }, ( _, index ) => ({
                    id: `param${index}`,
                    label: `Temperatura ${index + 1}`,
                }) ),
            ],
        }
    }

}

export default dashboardHelper;