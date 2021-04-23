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
    Divider,
    Chip
} from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';





// Misc imports
import messages from './messages';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    gridcontainer: {
        marginTop: theme.spacing(1)
    }
}));


function TopSheetDisplayer(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const id = open ? 'sheetinfo-popover' : undefined;
    console.log(props);
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
                        {props.data.title}
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
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                    {props.data.subject !== null ? props.data.subject.label : ""}
                                </Typography>
                            </Grid>
                            
                            <Grid item>
                                <Typography color="textSecondary" gutterBottom>
                                    TO DO : inject INTL + recup auteur
                                </Typography>
                            </Grid>
                            <Divider variant="fullWidth" />
                            <Grid item>
                                <Typography color="textSecondary">
                                    {props.data.descr}

                                </Typography>
                            </Grid>
                            <Divider variant="fullWidth" />
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    {props.data.tags.map((tag) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Grid item><Chip label={tag.label} /></Grid>
                                    ))}

                                </Grid>
                            </Grid>
                        </Grid>
                            

                    </CardContent>
                </Card>
            </Popover>
        </React.Fragment>


    );
}

TopSheetDisplayer.propTypes = {};

export default memo(TopSheetDisplayer);
