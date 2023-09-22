import { DELETE_EVENT_LIST, SET_EVENT_LIST, SET_EVENTS_LIST } from "../types";

const intitialState = {
  events: [],
  event: {},
};
export default function (state = intitialState, action) {
  
  switch (action.type) {
    case SET_EVENT_LIST:
      return {
        ...state,
        event: action.payload,
      };
    case SET_EVENTS_LIST:
      return {
        ...state,
        events: action.payload,
      };
      case DELETE_EVENT_LIST:
        return {
          ...state,
          events: state.events.filter(p =>p._id !== action.payload),
        };  
    default:
      return state;
  }
}
