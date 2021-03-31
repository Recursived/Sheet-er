/**
 * This file contains any function that would clutter the file of a component
 * /!\Functions should be grouped by specific pages /!\
 */

// Locale utils
export function countryToFlag(isoCode) {
    // Pour les drapeaux et leur code https://material-ui.com/components/autocomplete/ 
    // Country select component
    const codeConverter = {
        'en': 'gb',
        'fr': 'fr'
    };
    isoCode = codeConverter[isoCode];
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode
}

export const localeLabels = {
    'en': 'English',
    'fr': 'Français'
}

export const localeToCode = {
    'en': 'en-EN',
    'fr': 'fr-FR'
}
// Editing pages utils

/**
 * This function check if a sheet exists in redux store
 * @param {obj} editing 
 * @returns 
 */
export function checkSheetExist(editing) {
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
export function checkSheetDeleted(editing) {
    return editing.editor_content_sheet === null &&
        editing.title_sheet === null &&
        editing.id_sheet === null &&
        editing.type_sheet === null &&
        (editing.tags_sheet !== null && editing.tags_sheet.length == 0);
}
