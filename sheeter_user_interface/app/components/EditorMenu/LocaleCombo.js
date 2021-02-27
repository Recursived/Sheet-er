import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import {
    TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


// Selector & actions imports
import {makeSelectLocale} from 'containers/LanguageProvider/selectors';
import { requestSetLocaleSheet } from 'containers/EditingPage/actions'; 

// Misc imports
import messages from './messages';
import {
    appLocales,
    countryToFlag,
    localeLabels
} from 'i18n';

function LocaleCombo(props) {
    const {defaultLocale, dispatch} = props;
    const [localeValue, setLocaleValue] = React.useState(defaultLocale);

    React.useEffect(() => {
        dispatch(requestSetLocaleSheet(localeValue));
    }, [localeValue])
    
    return (
        <Autocomplete
            options={appLocales}
            defaultValue={defaultLocale}
            autoHighlight
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            onInputChange={(_, value) => setLocaleValue(value)}
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

LocaleCombo.propTypes = {
    defaultLocale: PropTypes.string.isRequired
};

const mapStateToProps = createStructuredSelector({
    defaultLocale: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(LocaleCombo);