// File that contains every path of api endpoint
const BASE_URL = 'http://127.0.0.0:8000';
const SHEET_PATH = '/sheet';
const SHEETTAG_PATH = '/sheettag';
const SHEETTYPE_PATH = '/sheettype';

/*
* Api endpoint that gathers every path of all the services
*/
export default class ApiEndpoint {
  constructor() {
    this.getBasePath = this.getBasePath.bind(this);
    this.getSheetPath = this.getSheetPath.bind(this);
    this.getSheetTagPath = this.getSheetPath.bind(this);
    this.getSheetTypePath = this.getSheetPath.bind(this);
  }

  getBasePath() {
    return `${BASE_URL}`;
  }

  getSheetPath() {
    return `${BASE_URL}${SHEET_PATH}`;
  }

  getSheetTagPath() {
    return `${BASE_URL}${SHEETAG_PATH}`;
  }

  getSheetTypePath() {
    return `${BASE_URL}${SHEETTYPE_PATH}`;
  }


}
