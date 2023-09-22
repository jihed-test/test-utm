import { combineReducers } from "redux";

import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'
import eventListReducer from './eventListReducer'
import eventUserReducer from "./eventUserReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profiles: profileReducer,
    events:eventListReducer,
    eventUser:eventUserReducer,

})