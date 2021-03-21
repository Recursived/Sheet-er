import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    Tooltip,
    ButtonGroup,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';

// Importing icons
import RestorePageIcon from '@material-ui/icons/RestorePage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinkIcon from '@material-ui/icons/Link';

// Importing actions and selectors
import {
    requestDeleteSheet
} from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';


// Misc imports
import messages from './messages';


function GroupButtonEditor(props) {
    const { dispatch, editing } = props;
    const [open, setOpen] = React.useState(false);


    return (
        <React.Fragment>
            <ButtonGroup disableElevation variant="contained" color="primary" >
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipdeletesheetbutton} />}>
                    <Button
                        disabled={editing.id_sheet === null}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => setOpen(true)}
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

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="Title of dialog"
            >
                <DialogTitle id="alert-dialog-title">{<FormattedMessage {...messages.deletetitledialog} />}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormattedMessage {...messages.deletecontentdialog} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            dispatch(requestDeleteSheet());
                        }}
                        color="primary"
                    >
                        <FormattedMessage {...messages.deleteyesbuttondialog} />
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        <FormattedMessage {...messages.deletenobuttondialog} />
                    </Button>
                </DialogActions>
            </Dialog>
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