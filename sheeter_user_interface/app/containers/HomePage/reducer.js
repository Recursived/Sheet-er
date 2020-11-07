/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';

export const initialState = {
  sheets: []
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

    }
  });

export default homePageReducer;
