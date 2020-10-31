import OpenAPIClientAxios from 'openapi-client-axios';



// Definition of the const to retrieve the corresponding API
export const RETRIEVE_SHEETAPI = "sheet";
export const RETRIEVE_USERAPI = "user";

const userAPI = new OpenAPIClientAxios({ definition : "http://localhost:8001/swagger.json", validate: false});
const sheetAPI =  new OpenAPIClientAxios({ definition : "http://localhost:8000/swagger.json", validate: false});


/**
 * Retrieve the name of the API according to an exported constant of the same file
 * @param {String} name 
 * @return {null|OpenAPIClientAxios}
 */
export default function getAPI(name){
    switch(name){
        case RETRIEVE_USERAPI:
            return userAPI;
        case RETRIEVE_SHEETAPI:
            return sheetAPI;
        default:
            return null;
    }
}