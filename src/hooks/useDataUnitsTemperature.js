import { useEffect, useState } from 'react';
import apiJDWialonService from '../services/api_jd_wialon_service';

const useDataUnitsTemperature = ( group, account = null ) => {
    const [ units, setUnits ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ loading, setLoading ] = useState(false);
    const groupsFilterKey = JSON.stringify( group ?? "all" );

    useEffect ( () => {
        const getDataUnitsTemperature = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await apiJDWialonService.getUnitsFaildureTemperature( JSON.parse(groupsFilterKey), account );

                setUnits( response );

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }

        getDataUnitsTemperature();

        const interval = setInterval ( () => {
            getDataUnitsTemperature();
        }, 60000 );

        return () => {
            clearInterval( interval );
        }   
    }, [groupsFilterKey] );

    return {
        units,
        error,
        loading,
    }
}

export default useDataUnitsTemperature;