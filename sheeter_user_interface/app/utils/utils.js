/*******************************************************************************
 * This file contains any function that would clutter the file of a component  *
 * /!\ Functions should be grouped by specific pages /!\                       *
 *******************************************************************************/

// Imports
import React from 'react';


// Locale utils

/**
 * Transform isoCode of locale into a char reprensenting an flag
 * @param {string} isoCode 
 * @returns 
 */
export function countryToFlag(isoCode) {
    // For flags and their code https://material-ui.com/components/autocomplete/ 
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

export const codeToLocale = {
    'en-EN': 'en',
    'fr-FR': 'fr'
}
// Editing pages utils

function checkNullOrEmpty(val) {
    return val === null || val === "";
}

/**
 * Error boundary class acting as try catch but for components
*/
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.error;
        }

        return this.props.children;
    }
}


/**
 * This function check if a sheet exists in redux store 
 * @param {obj} editing 
 * @returns array
 */
export function checkSheetComplete(editing) {
    return !checkNullOrEmpty(editing.editor_content_sheet) &&
        !checkNullOrEmpty(editing.title_sheet) &&
        !checkNullOrEmpty(editing.locale_sheet) &&
        !checkNullOrEmpty(editing.type_sheet) &&
        !checkNullOrEmpty(editing.descr_sheet) &&
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
        editing.descr_sheet === null &&
        (editing.tags_sheet !== null && editing.tags_sheet.length == 0);
}


