import {
    INCREMENT,
    OFFSET,
    LIMIT
  } from './actions.js';

  
  const INITIAL_STATE = {
    hero: {},
    offset: 0,
    limit: 50
  };
  
  export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case INCREMENT:
          return {
            ...state,
            hero: action.hero  
          };
      case OFFSET:
          return {
            ...state,
            offset: action.offset  
          };
      case LIMIT:
          return {
            ...state,
            limit: action.limit  
          };         
      default:
        return state;
    }
  };