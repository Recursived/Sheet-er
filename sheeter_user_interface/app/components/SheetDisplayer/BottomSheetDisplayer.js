/**
 *
 * SheetDisplayer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';


// Icons imports
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Misc imports
import { WrapperEditor } from 'components/SheeterEditor/WrapperEditor';
import messages from './messages';



function BottomSheetDisplayer(props) {

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
                    <Button variant="outlined" endIcon={<SkipNextIcon />} disabled={props.data.next_sheet === null}>
                        <FormattedMessage {...messages.labelnextsheetbutton} />
                    </Button>
                </Tooltip>

            </Grid>

        </Grid>

    );
}

BottomSheetDisplayer.propTypes = {};

export default memo(BottomSheetDisplayer);
