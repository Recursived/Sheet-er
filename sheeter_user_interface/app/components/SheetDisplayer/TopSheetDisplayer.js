/**
 *
 * SheetDisplayer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Grid,
    Typography,
    IconButton,
    makeStyles,
    Popover,
    Card,
    CardContent,
    Divider
} from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';





// Misc imports
import messages from './messages';
import InfoIcon from '@material-ui/icons/Info';


function TopSheetDisplayer() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'sheetinfo-popover' : undefined;
    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h4">
                        TITRE test
                </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} aria-label="delete">
                        <InfoIcon />
                    </IconButton>
                </Grid>

            </Grid>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Sujet
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Auteur + date créa
                        </Typography>

                        <Divider variant="middle" />
                        <Typography color="textSecondary">
                            Description

                        </Typography>
                        <Typography color="textSecondary">
                            tags + temps de lecture/nbr de mots

                        </Typography>

                    </CardContent>
                </Card>
            </Popover>
        </React.Fragment>


    );
}

TopSheetDisplayer.propTypes = {};

export default memo(TopSheetDisplayer);
