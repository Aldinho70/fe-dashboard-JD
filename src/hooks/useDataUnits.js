import { useEffect, useState } from "react";
import api_jd_wialon_service from "../services/api_jd_wialon_service.js";

const useDataUnits = () => {
    const [ dataUnits, setDataUnist ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect ( () => {

        const loadDataUnits = async () => {
            try {

                setLoading( true );

                const data = await api_jd_wialon_service.getAllGroups();

                setDataUnist( data );
                
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        loadDataUnits();
    }, [] );

    return {
        dataUnits,
        loading,
        error,
    }
}  

export default useDataUnits