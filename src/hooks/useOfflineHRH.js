import { useEffect, useState } from "react";
import api_jd_wialon_service from "../services/api_jd_wialon_service";

const useOfflineHRH = (group) => {

    const [unitsOffline, setUnitsOffline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getUnitsOffline = async () => {

            try {

                setLoading(true);

                const response_offline = await api_jd_wialon_service.getUnitsOfflineByGroup( 'GRUPO HRH', 'HRH' );

                setUnitsOffline(response_offline);

            } catch (error) {

                setError(error);

            } finally {

                setLoading(false);

            }

        };

        getUnitsOffline();

        const interval = setInterval( () => {
            getUnitsOffline();
        }, 60000)

        return () => {
            clearInterval(interval);
        }

    }, [group]);

    return {
        unitsOffline,
        loading,
        error,
    };
};

export default useOfflineHRH;