import AxiosService from "./axios_service.js";

class ApiJdService {

    constructor(){
        this.TOKEN_DFN = import.meta.env.VITE_TOKEN_WIALON_DFN;
        this.TOKEN_HRH = import.meta.env.VITE_TOKEN_WIALON_HRH;
        this.BASE_URL_API_JD = import.meta.env.VITE_BASE_URL_API_JD_WIALON;
    }


    async getAllGroups () {
        const url = `${this.BASE_URL_API_JD}getGroups/${this.TOKEN_DFN}`;
        try {
            const response = await AxiosService.get( url );
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getGroup ( group = "all" ) {
        const url = `${this.BASE_URL_API_JD}getGroups/${this.TOKEN_DFN}?group=${group}`;
        try {
            const response = await AxiosService.get( url );
            return response
        } catch (error) {
            throw this.handleError( error )
        }
    }

    async getUnitsOfflineByGroup ( group = "all" ) {
        const url = `${this.BASE_URL_API_JD}getStatusConectionsGroups/${group}/${this.TOKEN_DFN}`;
        try {
            const response = await AxiosService.get( url );
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

}

export default new ApiJdService();