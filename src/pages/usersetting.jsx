import React from 'react'
import {Paper} from '@material-ui/core'
import {connect} from 'react-redux'
import Axios from 'axios'
import {Redirect} from 'react-router'

class usersetting extends React.Component{
    state = {
        errormsg : '',
        redirect : false
    }
    changePassword = () =>{
        var oldpassword = this.refs.oldpass.value
        console.log(oldpassword)
        var newpassword = this.refs.newpass.value
        var newpassword2 = this.refs.newpass2.value
        if(newpassword !== newpassword2){
            return(
                this.setState({
                    errormsg : "Password dan Password Konfirmasi Salah!"
                })
            )
        }
       
        Axios.get('http://localhost:2000/users?username='+ this.props.currentUser)
        .then((res)=>{
            console.log(res.data[0].password)
            if(res.data[0].password !== oldpassword){
               
                return (
                    this.setState({
                        errormsg : "Password Lama Salah!"
                    })
                )
            }
            Axios.patch('http://localhost:2000/users/'+res.data[0].id, {password : newpassword})
            .then((res)=>{
                this.setState({
                    redirect : true
                })
                window.alert("Password Telah Berhasil Diubah")

            })
        })
        .catch((err)=>{
            console.log(err)
        })



        
    }

    render(){
        if(this.state.redirect === true){
            return(
                <Redirect to="/"></Redirect>
            )
        }
        if(this.props.IS_LOGGED_IN === false){
            return (
                <div className="pt-5 filtercss"> Login First before change the password</div>
            )
        }
        return(
            <div className="mycontainer" >
            <div className='row justify-content-center mt-5'>
                <div className=" mt-5 col-md-8">
                    <Paper  className="p-5">
                        <h1 className="mb-5">Change Password</h1>
                        <input type="password" ref="oldpass" className="form-control form-control-lg mt-3" placeholder="CURRENT PASSWORD"></input>
                        <input type="password" ref="newpass" className="form-control form-control-lg mt-3" placeholder="NEW PASSWORD"></input>
                        <input type="password" ref="newpass2" className="form-control  form-control-lg mt-3 mb-3 " placeholder="CONFIRM NEW PASSWORD"></input>
                        <p className="mb-3" style={{color : "red", fontWeight : "bolder"}}> </p>
                        <input type="button" className="btn btn-success btn-lg mt-3 mb-5" value="Change Password" onClick={() => this.changePassword()}></input>
                    
                        {
                            this.state.errormsg === '' 
                            ?
                            <p></p>
                            :
                            this.state.errormsg !== ''
                            ?
                            <div style={{height : "70px"}}className='alert alert-danger'> {this.state.errormsg} <span style={{fontWeight : "bolder", cursor : 'pointer', float : "right"}} onClick={()=>{this.setState({errormsg : ""})}}> X</span></div>
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
       IS_LOGGED_IN : state.CURRENT_USER_DATA.IS_LOGGED_IN,
       saldouser : state.CURRENT_USER_DATA.saldo,
       cartlength : state.CURRENT_USER_DATA.cartlength
    }
}

export default connect(mapStateToProps)(usersetting);