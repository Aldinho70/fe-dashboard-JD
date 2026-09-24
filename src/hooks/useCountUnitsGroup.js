import { useEffect, useState } from "react";
import api_jd_wialon_service from "../services/api_jd_wialon_service";
import useCountUnitGroupHelper from "../helpers/useCountUnit.helper";

const useCountUnitsGroups = () => {
    const [ countUnits, setCountUnits ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError] = useState(null);

    useEffect( () => {

        const getDataGroups = async () => {
            try {

                setLoading( true );

                const dataGroups = await api_jd_wialon_service.getAllGroups();

                const countUnitsByGroupFilter = useCountUnitGroupHelper.getCountUnitsGroupsFilter( dataGroups, ['Noelie', 'Difeyro', 'Filsa', '00-DIFEYRO SEGURIDAD', 'Z - DESVIADOS NOELIE', 'DIFEYRO MIGRACION MEERKAT']);

                setCountUnits( countUnitsByGroupFilter );

            } catch (error) {
                setError( error );
            } finally {
                setLoading(false);
            }
        }

        getDataGroups();

        const interval = setInterval( () => {
            getDataGroups();
        }, 60000)

        return () => {
            clearInterval(interval);
        }

    }, []);

    return{
        countUnits,
        loading,
        error,
    }

}

export default useCountUnitsGroups;