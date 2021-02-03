import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormattedMessage } from 'react-intl';

// Importing icons
import CircularProgress from '@material-ui/core/CircularProgress';

// Importing actions and selectors
import { makeSelectSheetTypes } from 'containers/EditingPage/selectors';
import { requestSheetTypeAction } from 'containers/EditingPage/actions';

// Misc imports
import messages from './messages';

function SheetTypeCombo(props) {
    const { sheet_types, dispatch } = props;
    const options = sheet_types.map((option) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
    const [open, setOpen] = React.useState(false);
    const loading = open && sheet_types.length === 0;

    return (
        <Autocomplete
            onOpen={() => {
                setOpen(true);
                dispatch(requestSheetTypeAction());
            }}
            onClose={() => setOpen(false)}
            open={open}
            onChange={(_, value) => console.log(value)}
            loading={loading}
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            autoHighlight
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.label}
            noOptionsText={<FormattedMessage {...messages.nooptionslabel} />}
            renderOption={(option) => (
                <span>{option.label}</span>
            )}
            loadingText={<FormattedMessage {...messages.loadinglabel}/>}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    label={<FormattedMessage {...messages.labelsheettype} />}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}


        />
    )
}

SheetTypeCombo.propTypes = {
    sheet_types: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
    sheet_types: makeSelectSheetTypes()
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
    memo
)(SheetTypeCombo);