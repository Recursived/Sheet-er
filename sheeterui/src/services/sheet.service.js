import {ApiEndpoint} from '../utils/api';
import {coreapi} from 'coreapi'

export default class SheetService{
    
    constructor(){
        this.client = new coreapi.Client();
        let endpoint = new ApiEndpoint();
        // this.api = {
        //     'sheet_url' : endpoint.get
        // } 
    }

    
}