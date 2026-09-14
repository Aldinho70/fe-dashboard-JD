import { useEffect, useState } from "react";
import api_jd_wialon_service from "../services/api_jd_wialon_service";

const useUnitsOffline = (group) => {

    const [unitsOffline, setUnitsOffline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getUnitsOffline = async () => {

            try {

                setLoading(true);

                const dataGroups =
                    await api_jd_wialon_service.getUnitsOfflineByGroup(group);

                setUnitsOffline(dataGroups);

            } catch (error) {

                setError(error);

            } finally {

                setLoading(false);

            }

        };

        getUnitsOffline();

    }, [group]);

    return {
        unitsOffline,
        loading,
        error,
    };
};

export default useUnitsOffline;