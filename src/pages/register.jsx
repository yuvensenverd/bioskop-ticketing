import React from 'react'
import {Paper} from '@material-ui/core'
import Axios from 'axios';
import {Redirect} from 'react-router-dom'
import { logUser } from './../redux/actions/countActions'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'


class Register extends React.Component{
    state={
        userdata : [],
        err : "",
        isLoading : false
    }

    componentDidMount(){
        this.getLoginData()
    }
    getLoginData = () => {
    
        Axios.get('http://localhost:2000/users/')
        .then((res) => {
            
            this.setState({
                userdata : res.data
            })
            // console.log("ini userdata state", this.state.userdata)
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    registerIsValid = () => {
        var username = this.refs.reguser.value
        var password = this.refs.regpass.value
        var password2 = this.refs.regpass2.value
        console.log(username, password, password2)

        if(username === "" || password=== "" || password2=== ""){
         
            return(
            this.setState({
                err : "Please complete the empty field"
            })
            )
        }else {
            
            if(password !== password2){
                // tidak valid 
                return (
                this.setState({
                    err : "Your password and confirm password does not match"
                })
                )
            }else {
                this.setState({ isLoading : true})
                Axios.get('http://localhost:2000/users?username='+username)
                .then((res)=>{
                    console.log("MasukAxios1")
                    if(res.data.length > 0){
                        this.setState({
                            err : "Username is already being used",
                            isLoading : false
                        })
                    }
                })
                .catch((err) =>{
                    console.log(err, "Masuk")
                    
                })

            }
            var userdata ={
                role : "user",
                username : username, 
                password : password,
                transaction : [],
                saldo : 0
            }
            Axios.post('http://localhost:2000/users',userdata)
            .then((res)=>{
                window.alert("Your account has been registered successfully")
                this.props.logUser(username)
                this.setState({
                    redirect : true,
                    isLoading : false
                })
                
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        

        
        
       
        
    }
    render(){
      
        if(this.props.IS_LOGGED_IN === true) {
           
           return <Redirect to="/" />
        }
        return(
            <div className="mycontainer" >
                <div className='row justify-content-center mt-5'>
                    <div className=" mt-5 col-md-8">
                        <Paper  className="p-5">
                            <h1 className="mb-5">Register Form</h1>
                            <input type="text" ref="reguser" className="form-control form-control-lg mt-3" placeholder="your username"></input>
                            <input type="password" ref="regpass" className="form-control form-control-lg mt-3" placeholder="your password"></input>
                            <input type="password" ref="regpass2" className="form-control  form-control-lg mt-3 mb-3 " placeholder="confirm password"></input>
                            <p className="mb-3" style={{color : "red", fontWeight : "bolder"}}> </p>
                            {
                            this.state.err === '' 
                            ?
                            <p></p>
                            :
                            this.state.err !== ''
                            ?
                            <div className='alert alert-danger'> {this.state.err} <span style={{fontWeight : "bolder", cursor : 'pointer', float : "right"}} onClick={()=>{this.setState({err : ""})}}> X</span></div>
                            :
                            null


                            }
                            {this.state.isLoading === true 
                            ?
                            <Loader type='ThreeDots' color='black' width="55px"></Loader>
                            :
                            this.state.isLoading === false
                            ?
                            <input type="button" className="btn btn-outline-success btn-lg mt-3" value="Register" onClick={() => this.registerIsValid()}></input>
                            :
                            null
                            }
                            
                            

                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
       currentUser : state.CURRENT_USER_DATA.currentUser,
       IS_ADMIN : state.CURRENT_USER_DATA.IS_ADMIN,
       IS_LOGGED_IN : state.CURRENT_USER_DATA.IS_LOGGED_IN
       
    }
}


export default connect(mapStateToProps, {logUser})(Register); // bisa juga null bukan mapstatetoprosps