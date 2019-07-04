// AXIOS GET ?

const INITIAL_STATE = { 
    currentUser : "",
    IS_LOGGED_IN : false,
    IS_ADMIN : false
}

var CountReducer = (state = INITIAL_STATE, action) =>{
    if(action.type === 'USER'){
        var userid = action.payload.username
        return{...state, IS_LOGGED_IN : true, IS_ADMIN : false, currentUser : userid}
    }
    else if(action.type === 'ADMIN'){
        var userid = action.payload.username
        return{...state, IS_LOGGED_IN : true, IS_ADMIN : true, currentUser : userid}
    }
    else if(action.type === "LOGOUT"){
        return{...state, IS_LOGGED_IN : false, IS_ADMIN : false}
    }
    else {
        return state
    }
}


export default CountReducer;