import CountReducer from './countReducers'
import { combineReducers } from 'redux'

export default combineReducers({
    CURRENT_USER_DATA : CountReducer
})