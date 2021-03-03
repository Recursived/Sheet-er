/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';

export const initialState = {
  uid : null,
  backend : '',
  provider_access_token: ''
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
    }
  });

export default loginPageReducer;
