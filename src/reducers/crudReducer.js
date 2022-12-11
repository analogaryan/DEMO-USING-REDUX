import {
    CREATE_DATA,
    RETRIEVE_DATA,
    UPDATE_DATA,
    DELETE_DATA,
  } from "../action/actionTypes";
  
  const initialState = [];
  
  const crudReducer = (DATAs = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_DATA:
        const myNewData = [...DATAs, payload]
        return myNewData;
  
      case RETRIEVE_DATA:
        return payload;
  
      case UPDATE_DATA:
        return DATAs.map((DATA) => {
          if (DATA.id === payload.id) {
            return {
              ...DATA,
              ...payload,
            };
          } else {
            return DATA;
          }
        });
  
      case DELETE_DATA:
        return DATAs.filter(({ id }) => id !== payload.id);
  
  
      default:
        return DATAs;
    }
  };
  
  export default crudReducer;