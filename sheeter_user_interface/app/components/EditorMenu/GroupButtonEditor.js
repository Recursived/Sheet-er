import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    Tooltip,
    ButtonGroup,
    Button,
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';

// Importing icons
import RestorePageIcon from '@material-ui/icons/RestorePage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinkIcon from '@material-ui/icons/Link';

// Importing actions and selectors
// import {
//     requestSheetTagAction,
//     requestAddSheetTagAction,
//     requestSetTagSheet
// } from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';


// Misc imports
import messages from './messages';


function GroupButtonEditor(props) {
    const { dispatch, editing } = props;


    return (
        <React.Fragment>
            <ButtonGroup disableElevation variant="contained" color="primary" >
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipdeletesheetbutton} />}>
                    <Button
                        disabled={editing.id_sheet === null}
                        startIcon={<DeleteForeverIcon />}
                    >
                        <FormattedMessage {...messages.deletesheetbutton} />
                    </Button>
                </Tooltip>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltiplinksheetbutton} />}>
                    <Button
                        disabled={editing.id_sheet === null}
                        startIcon={<LinkIcon />}
                    >
                        <FormattedMessage {...messages.linksheetbutton} />
                    </Button>
                </Tooltip>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipsheethistorybutton} />}>
                    <Button
                        startIcon={<RestorePageIcon />}
                    >
                        <FormattedMessage {...messages.sheethistorybutton} />
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </React.Fragment>
    );
}

GroupButtonEditor.propTypes = {
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
)(GroupButtonEditor);