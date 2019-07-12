import Axios from 'axios'

export const logUser = (id, saldo) =>{
    return {
        type : "USER",
        payload : {username : id, saldo : saldo}
    }
}

export const logAdmin = (id, saldo) =>{
    return {
        type : "ADMIN",
        payload : {username : id, saldo : saldo}
    }
}

export const UserLogOut = () => {
    return{
        type : "LOGOUT"
    }
}

export const Transaksi = (number)=> {
  
    return{
        type: "TRANSAKSI",
        payload : number
    }
}

export const updateCart = (len)=>{
   
    return{
        type: "UPDATE",
        payload : len
    }
}