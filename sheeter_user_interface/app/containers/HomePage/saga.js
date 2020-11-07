import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import axios from 'axios';
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';

import { FormattedMessage } from 'react-intl';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import messages from './messages';

export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
}