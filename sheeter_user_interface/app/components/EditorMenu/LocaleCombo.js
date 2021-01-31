import React from 'react';
import {
    TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    appLocales,
    countryToFlag,
    localeLabels
} from 'i18n';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function LocaleCombo(props) {
    
    return (
        <Autocomplete
            options={appLocales}
            autoHighlight
            getOptionLabel={(option) => localeLabels[option]}
            noOptionsText={<FormattedMessage {...messages.nooptionslabel} />}
            renderOption={(option) => (
                <React.Fragment>
                    <span>{countryToFlag(option)}&nbsp;</span>
                    {localeLabels[option]} ({option})
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    label={<FormattedMessage {...messages.localesheet} />}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}