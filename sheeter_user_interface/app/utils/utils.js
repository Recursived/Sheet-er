/**
 * This file contains any function that would clutter the file of a component
 * Functions should be grouped by according to where they are used
 */

/**
 * This function check if a sheet exists in redux store
 * @param {obj} editing 
 * @returns 
 */
export function checkSheetExist(editing){
    return editing.editor_content_sheet !== null &&
    editing.title_sheet !== null &&
    editing.locale_sheet !== null &&
    editing.type_sheet !== null &&
    (editing.tags_sheet !== null && editing.tags_sheet.length > 0);
}

/**
 * This function check if a sheet has been deleted
 * @param {obj} editing 
 * @returns 
 */
export function checkSheetDeleted(editing){
    return editing.sheet_deleted &&
    editing.editor_content_sheet === null &&
    editing.title_sheet === null &&
    editing.id_sheet === null &&
    editing.type_sheet === null &&
    (editing.tags_sheet !== null && editing.tags_sheet.length == 0);
}