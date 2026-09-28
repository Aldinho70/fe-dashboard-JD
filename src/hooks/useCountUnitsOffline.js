import { useEffect, useState } from 'react';
import apiJDWialonService from '../services/api_jd_wialon_service';

const useCountUnitsOffline = ( groups_filter, account = null ) => {
    const [ groups, setGroups ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ loading, setLoading ] = useState(false);
    const groupsFilterKey = JSON.stringify( groups_filter ?? "all" );

    useEffect ( () => {
        const getCountUnitsOffline = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await apiJDWialonService.getCountUnitsOfflineGroups( JSON.parse(groupsFilterKey), account );

                setGroups( response );

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }

        getCountUnitsOffline();

        const interval = setInterval ( () => {
            getCountUnitsOffline();
        }, 60000 );

        return () => {
            clearInterval( interval );
        }   
    }, [groupsFilterKey] );

    return {
        groups,
        error,
        loading,
    }
}

export default useCountUnitsOffline;