import { SET_EVENT_USER,SET_EVENT_USERS,DELETE_EVENT_USER } from "../types";

const intitialState = {
  eventsUser: [],
  eventUser: {},
};
export default function (state = intitialState, action) {
  console.log(action.type)
    console.log(action.payload)
  switch (action.type) {
    case SET_EVENT_USER:
      return {
        ...state,
        event: action.payload,
      };
    case SET_EVENT_USERS:
      return {
        ...state,
        events: action.payload,
      };
      case DELETE_EVENT_USER:
        return {
          ...state,
          events: state.events.filter(p =>p._id !== action.payload),
        };  
    default:
      return state;
  }
}
