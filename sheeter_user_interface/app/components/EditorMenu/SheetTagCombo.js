import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FormattedMessage } from 'react-intl';

// Importing icons
import CircularProgress from '@material-ui/core/CircularProgress';

// Importing actions and selectors
import { requestSheetTagAction } from 'containers/EditingPage/actions';
import { makeSelectSheetTag } from 'containers/EditingPage/selectors';


// Misc imports
import messages from './messages';


const filter = createFilterOptions();

function SheetTagCombo(props) {
    const [value, setValue] = React.useState(null);
    const { dispatch } = props;
    return (
        <Autocomplete
            value={value}
            onInputChange={(_, newValue) => dispatch(requestSheetTagAction(newValue))}
            onChange={(_, newValue) => {
                console.log(newValue);
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={[]}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(option) => option.title}
            style={{ width: 300 }}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Free solo with text demo"
                    variant="standard"
                />
            )}
        />
    );
}

SheetTagCombo.propTypes = {};

const mapStateToProps = createStructuredSelector({
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
)(SheetTagCombo);