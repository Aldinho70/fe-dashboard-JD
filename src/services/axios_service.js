import axios from "axios";

const axiosClient = axios.create({
    timeout: 10000
});

const pendingRequests = new Map();

const AxiosService = {

    async get(url, config = {}) {

        const key = this.createRequestKey(
            "GET",
            url,
            config
        );

        // Si ya existe una petición idéntica en curso,
        // reutilizamos esa misma Promise.
        if (pendingRequests.has(key)) {
            console.warn(`Petición duplicada bloqueada: ${url}`);

            return pendingRequests.get(key);
        }

        const request = axiosClient
            .get(url, config)
            .then(response => response.data)
            .catch(error => {
                throw this.handleError(error);
            })
            .finally(() => {
                pendingRequests.delete(key);
            });

        pendingRequests.set(key, request);

        return request;
    },

    async post(url, data = {}, config = {}) {

        try {

            const finalConfig = {
                ...config,
                headers: {
                    "Content-Type": "application/json",
                    ...config.headers
                }
            };

            const response = await axiosClient.post(
                url,
                data,
                finalConfig
            );

            return response.data;

        } catch (error) {
            throw this.handleError(error);
        }
    },

    createRequestKey(method, url, config = {}) {

        return JSON.stringify({
            method,
            url,
            params: config.params ?? {}
        });

    },

    handleError(error) {

        if (error.response) {

            return new Error(
                `HTTP ${error.response.status}: ${JSON.stringify(
                    error.response.data
                )}`
            );

        }

        if (error.request) {
            return new Error(
                "No se recibió respuesta del servidor"
            );
        }

        return new Error(error.message);
    }
};

export default AxiosService;