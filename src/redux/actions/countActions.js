export const logUser = (id) =>{
    return {
        type : "USER",
        payload : {username : id}
    }
}

export const logAdmin = (id) =>{
    return {
        type : "ADMIN",
        payload : {username : id}
    }
}

export const UserLogOut = () => {
    return{
        type : "LOGOUT"
    }
}