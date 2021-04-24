/**
 *
 * SheetDisplayer
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';


// Icons imports
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Misc imports
import messages from './messages';



function BottomSheetDisplayer(props) {
    const { dispatch } = props;

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <Grid item>
                <Rating
                    name="simple-controlled"
                />
            </Grid>
            <Grid item>
                <Tooltip title={<FormattedMessage {...messages.tooltipnextsheet} />}>
                    <Button
                        variant="outlined"
                        endIcon={<SkipNextIcon />}
                        disabled={props.data.next_sheet === null}
                        onClick={() => dispatch(push("/sheet/" + props.data.next_sheet.id))}
                    >
                        <FormattedMessage {...messages.labelnextsheetbutton} />
                    </Button>
                </Tooltip>

            </Grid>

        </Grid>

    );
}

BottomSheetDisplayer.propTypes = {
    data : PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(BottomSheetDisplayer);

