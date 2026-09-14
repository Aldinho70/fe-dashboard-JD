import { useEffect, useState } from 'react';
import useDataHRHHelper from '../helpers/useDataHRH.helper';
import api_jd_wialon_service from '../services/api_jd_wialon_service';

const useCountHRH = () => {

    const [ dataHRH, setDataHRH ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const groupsFilter = [
            'GRUPO HRH',
            '03-CARGAS MEXICO',
            // '03-POLLO VIVO',
            '04-CONGELADO',
            '05-FRESCO',
            '03-CARGAS FORANEAS',
            'HRH CAJAS',
            'HRH SEGURIDAD',
        ]

    useEffect( () => {

        const getDataHRH = async () =>{
            try {
                setLoading( true );

                const response = await api_jd_wialon_service.getAllGroups( 'HRH' );
                const groupsFiltered = useDataHRHHelper.getGroupsFilter( response, groupsFilter );

                setDataHRH( groupsFiltered );

            } catch (error) {
                setError( error );
            } finally {
                setLoading( false );
            }
        }
        
        getDataHRH();

        const interval = setInterval( () => {
            getDataHRH();
        }, 60000)

        return () => {
            clearInterval(interval);
        }

    }, [] );

    return{
        dataHRH,
        loading,
        error,
    }
}

export default useCountHRH;