import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FormattedMessage, injectIntl } from 'react-intl';

// Importing icons
import CircularProgress from '@material-ui/core/CircularProgress';

// Importing actions and selectors
import {
    requestSheetTagAction,
    requestAddSheetTagAction,
    requestSetTagSheet
} from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';


// Misc imports
import messages from './messages';



const filter = createFilterOptions();

function SheetTagCombo(props) {
    const [toReplace, setToReplace] = React.useState(0);
    const [value, setValue] = React.useState([]);
    const { editing, intl, dispatch } = props;
    const handlerChange = React.useCallback(
        debounce((newValue) => dispatch(requestSheetTagAction(newValue)), 500),
        []
    );
        


    React.useEffect(() => {
        if (editing.response_add_tag !== null) {
            value[toReplace] = editing.response_add_tag;

        }
        dispatch(requestSetTagSheet(value));
    }, [editing.response_add_tag, value])

    return (
        <Autocomplete
            value={value}
            defaultValue={value}
            onKeyUp={(e) => {
                if (e.target.value !== "") {
                    handlerChange(e.target.value)
                }
            }}
            onChange={(_, arr) => {
                setValue([...arr]);
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].inputValue) {
                        dispatch(requestAddSheetTagAction(arr[i].inputValue));
                        setToReplace(i);
                    }
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (filtered.length == 0 && params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        label: intl.formatMessage(messages.addtaglabel, {
                            tag: params.inputValue
                        }),
                    });
                }
                return filtered;
            }}

            selectOnFocus
            clearOnBlur
            multiple
            autoComplete
            getOptionSelected={(option, value) => {
                return isEqual(option, value);
            }}
            handleHomeEndKeys
            limitTags={2}
            options={editing.sheet_tags}
            getOptionLabel={(option) => {
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.label;
            }}
            renderOption={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={<FormattedMessage {...messages.taglabel} />}
                    placeholder={value.length == 0 ? intl.formatMessage(messages.tagplaceholder) : ""}
                    variant="standard"
                />
            )}
        />
    );
}

SheetTagCombo.propTypes = {
    editing: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
    editing: makeSelectEditingPage()
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
    memo,
    injectIntl
)(SheetTagCombo);