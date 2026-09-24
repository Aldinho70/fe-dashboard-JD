import AxiosService from "./axios_service.js";

class ApiJdService {

    constructor(){
        this.TOKEN_DFN = import.meta.env.VITE_TOKEN_WIALON_DFN;
        this.TOKEN_HRH = import.meta.env.VITE_TOKEN_WIALON_HRH;
        this.BASE_URL_API_JD = import.meta.env.VITE_BASE_URL_API_JD_WIALON;
    }


    async getAllGroups ( account = "DFN" ) {
        const token = ( account == 'HRH' ) ? this.TOKEN_HRH : this.TOKEN_DFN;
        const url = `${this.BASE_URL_API_JD}getGroups/${token}`;

        try {
            const response = await AxiosService.get( url );
            return response;
        } catch (error) {
            // throw this.handleError(error);
            console.log(error);
        }
    }

    async getGroup ( group = "all", account = "DFN" ) {
        const token = ( account == 'HRH' ) ? this.TOKEN_HRH : this.TOKEN_DFN;
        const url = `${this.BASE_URL_API_JD}getGroups/${token}?group=${group}`;

        try {
            const response = await AxiosService.get( url );
            return response
        } catch (error) {
            // throw this.handleError( error )
            console.log( error )
        }
    }

    async getUnitsOfflineByGroup ( group = "all", account = "DFN" ) {
        const token = ( account == 'HRH' ) ? this.TOKEN_HRH : this.TOKEN_DFN;
        const url = `${this.BASE_URL_API_JD}getStatusConectionsGroups/${group}/${token}`;

        try {
            const response = await AxiosService.get( url );
            return response;
        } catch (error) {
            // throw this.handleError(error);
            console.log(error);
        }
    }

}

export default new ApiJdService();