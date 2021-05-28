/*
 *
 * HomePage actions
 *
 */

import {
    REQUEST_GET_SHEETLIST,
    SUCCESS_GET_SHEETLIST
} from './constants'



export function requestGetSheetList(searchfilter) {
    return {
        type: REQUEST_GET_SHEETLIST,
        searchfilter: searchfilter
    }
}

export function successGetSheetList(data) {
    return {
        type: SUCCESS_GET_SHEETLIST,
        data: data
    }
}