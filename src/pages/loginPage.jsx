import React from 'react'
import Axios from 'axios'

import { connect } from 'react-redux'
import { logUser } from './../redux/actions/countActions'
import { logAdmin } from './../redux/actions/countActions'
import { Redirect } from 'react-router'
 
class loginPage extends React.Component{
    state = {
        userdata : [],
        redirect : false
    }
    componentDidMount(){
        this.getLoginData()
    }
    getLoginData = () => {
    
        Axios.get('http://localhost:2000/users/')
        .then((res) => {
            console.log(res.data)
            this.setState({
                userdata : res.data
            })
            // console.log("ini userdata state", this.state.userdata)
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    validateUser = () => {
        var userid = this.refs.userIdLog.value
        var userpass = this.refs.userPassLog.value
        var isvalid = false

        this.state.userdata.map((val) => {
            if(userid === val.username && userpass === val.password){
                // VALID
                this.setState({
                    redirect : true // SUPAYA PINDAH PAGE
                })
                isvalid = true
                if(val.role == "user"){
                    return this.props.logUser(val.username)

                }else if(val.role === "admin"){
                    return this.props.logAdmin(val.username)

                }else {

                }
            }
        })

        if(isvalid === false){
            // IS NOT VALID
            window.alert("not valid")
        }
        
    }

    render(){
        const { redirect } = this.state
        if(redirect) {
           return <Redirect to="/" push={true} />
        }
        return (
            <div>
                <div className = 'justify-content-center text-center '>
                <h1 className='mb-5 mt-5'> Log In </h1>
                
                <p> Your Account </p>
                <input type="text" className="form-control text-center mb-5" ref="userIdLog" placeholder="Enter Account Here"/>
                <p> Your Password </p>
                <input type="password" className="form-control text-center mb-5" ref="userPassLog" placeholder="Enter Password Here"/>
                <input type="button" value="Submit" className="btn btn-success mb-5" onClick={() => this.validateUser()}/>
                <p className="text-center" style={{color : 'red'}}> </p>
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


export default connect(mapStateToProps, {logUser, logAdmin})(loginPage);