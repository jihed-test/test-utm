import { SET_EVENT_USER,SET_EVENT_USERS,DELETE_EVENT_USER,DELETE_EVENT_TITLE } from "../types";

const intitialState = {
  eventsUser: [],
  eventUser: {},
};
export default function (state = intitialState, action) {
  
  switch (action.type) {
    case SET_EVENT_USER:
      return {
        ...state,
        eventUser: action.payload,
      };
    case SET_EVENT_USERS:
      return {
        ...state,
        eventsUser: action.payload,
      };
      case DELETE_EVENT_USER:
        return {
          ...state,
          eventsUser: state.eventsUser.filter(p =>p._id !== action.payload),
        };  
        case DELETE_EVENT_TITLE:
        return {
          ...state,
          eventsUser: state.eventsUser.filter(p =>p.title !== action.payload),
        };  
    default:
      return state;
  }
}
