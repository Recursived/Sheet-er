import OpenAPIClientAxios from 'openapi-client-axios';

// Def of the cliend_id for the web app
export const CLIENT_ID = "GksdhKpX9wvGPiRc6TQv2KdV95Gy5kTL1bICpiME";

// Definition of the const to retrieve the corresponding API
export const RETRIEVE_SHEETAPI = "sheet";
export const RETRIEVE_USERAPI = "user";
export const RETRIEVE_CONTACTUS = "contact_us";

const userAPI = new OpenAPIClientAxios({ 
    definition : "http://localhost:8001/swagger.json", 
    validate: false,
    withServer: { url: 'http://localhost:8001', description: 'Auth server' }
});

const sheetAPI =  new OpenAPIClientAxios({ 
    definition : "http://localhost:8000/swagger.json", 
    validate: false,
    withServer: { url: 'http://localhost:8000', description: 'Sheet server' }
});

const contactusAPI =  new OpenAPIClientAxios({ 
    definition : "http://localhost:8002/swagger.json", 
    validate: false,
    withServer: { url: 'http://localhost:8002', description: 'Contact server' }
});


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
        case RETRIEVE_CONTACTUS:
            return contactusAPI;
        default:
            return null;
    }
}