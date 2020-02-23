const BASE_URL = 'http://127.0.0.1:8000'
const SHEETS_PATH = {
    'sheet' : `${BASE_URL}/sheet`,
    'sheettag' : `${BASE_URL}/sheettag`,
    'sheettype' : `${BASE_URL}/sheettype`
}

/**
 * Provides every usable API for the app
 */
export default class apiProvider {
    
    /** 
     * Provide a list of path according to the title of the API
     * 
     * @param {string} title The title of the django docs API (should be all lowercase)
     * @returns {object} A dictionnary of key and path of the API
    */
    getApi = (title) => {
        switch (title) {
            case 'sheets':
                return SHEETS_PATH;
            default:
                return null;
                
        }
    }


}