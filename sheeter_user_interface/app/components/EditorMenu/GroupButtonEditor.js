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
    DialogTitle,
    makeStyles
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';

// Importing icons
import RestorePageIcon from '@material-ui/icons/RestorePage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinkIcon from '@material-ui/icons/Link';

// Importing actions and selectors
import {
    requestDeleteSheet,
    requestOpenLinkSheetDialog
} from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';


// Misc imports
import messages from './messages';
import SheetPreviewDialog from 'components/SheetPreviewDialog'
import { checkSheetExist, localeToCode } from 'utils/utils';

const useStyles = makeStyles((theme) => ({
    deletepermbutton: {
        backgroundColor: `${theme.palette.error.main}`,
        color: `${theme.palette.error.contrastText}`,
        '&:hover': {
            backgroundColor: `${theme.palette.error.dark}`,
        }
    },
}));
function GroupButtonEditor(props) {
    const { dispatch, editing } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <ButtonGroup disableElevation variant="contained" color="primary" >
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipdeletesheetbutton} />}>
                    <Button
                        disabled={!checkSheetExist(editing)}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => setOpen(true)}
                    >
                        <FormattedMessage {...messages.deletesheetbutton} />
                    </Button>
                </Tooltip>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltiplinksheetbutton} />}>
                    <Button
                        disabled={!checkSheetExist(editing)}
                        startIcon={<LinkIcon />}
                        onClick={() => dispatch(requestOpenLinkSheetDialog(true))}
                    >
                        <FormattedMessage {...messages.linksheetbutton} />
                    </Button>
                </Tooltip>
            </ButtonGroup>
            <SheetPreviewDialog />
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
                            dispatch(requestDeleteSheet(true));
                        }}
                        variant="contained"
                        className={classes.deletepermbutton}
                    >
                        <FormattedMessage {...messages.deletepermenatentbuttondialog} />
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            dispatch(requestDeleteSheet(false));
                        }}
                        variant="contained"
                        color="secondary"
                    >
                        <FormattedMessage {...messages.deletebuttondialog} />
                    </Button>
                    <Button onClick={() => setOpen(false)} variant="contained" color="secondary" autoFocus>
                        <FormattedMessage {...messages.deletecancelbuttondialog} />
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