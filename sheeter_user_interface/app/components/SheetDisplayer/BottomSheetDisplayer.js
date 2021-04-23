/**
 *
 * SheetDisplayer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';


// Icons imports
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Misc imports
import { WrapperEditor } from 'components/SheeterEditor/WrapperEditor';
import messages from './messages';



function BottomSheetDisplayer() {

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
                <Button variant="outlined" endIcon={<SkipNextIcon />}>
                    <FormattedMessage {...messages.labelnextsheetbutton} />
                </Button>
            </Grid>

        </Grid>

    );
}

BottomSheetDisplayer.propTypes = {};

export default memo(BottomSheetDisplayer);
