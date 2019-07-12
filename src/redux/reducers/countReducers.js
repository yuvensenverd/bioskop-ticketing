




// AXIOS GET ?

const INITIAL_STATE = { 
    currentUser : "",
    IS_LOGGED_IN : false,
    IS_ADMIN : false,
    saldo : 0,
    cartlength : 0
}





var CountReducer = (state = INITIAL_STATE, action) =>{
    // function getSaldo(userid){
    //     Axios.get('http://localhost:2000/users?username='+userid)
    //         .then((res)=>{
                
    //             console.log(res.data[0].saldo)
    //              return res.data[0].saldo
                
    //         }) 
    //         .catch((err)=>{
    //             return err
    //         })
    // }
    if(action.type === 'USER'){
      
        // Axios.get('http://localhost:2000/users?username='+action.payload.username)
        // .then((res)=>{
        //      var saldouser =res.data[0].saldo
        //      console.log(saldouser)
             
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        // GET SALDO 
        var userid = action.payload.username
        var saldo = action.payload.saldo
        localStorage.setItem('username', userid)
        return{...state, IS_LOGGED_IN : true, IS_ADMIN : false, currentUser : userid, saldo : saldo}
    }
    else if(action.type === 'ADMIN'){
        
        
        
        var userid = action.payload.username
        var saldo = action.payload.saldo
      
      
        localStorage.setItem('username', userid)
        
        return{...state, IS_LOGGED_IN : true, IS_ADMIN : true, currentUser : userid, saldo : saldo}
    }
    else if(action.type === "LOGOUT"){
        // localStorage.clear()
        localStorage.removeItem("username")
        
        localStorage.setItem('cartuser', 0)
        return INITIAL_STATE
    }
    else if(action.type === "TRANSAKSI"){
        var transaksi = action.payload
        return{...state, saldo : state.saldo+transaksi}
    }
    else if(action.type === "UPDATE"){
        localStorage.setItem('cartuser', action.payload)
        return{...state, cartlength : action.payload}
    }
    else {
        return state
    }
}


export default CountReducer;