import React from 'react'
import Axios from 'axios'

import { connect } from 'react-redux'
import { logUser } from './../redux/actions/countActions'
import { logAdmin } from './../redux/actions/countActions'
import { updateCart } from './../redux/actions/countActions'
import { Redirect } from 'react-router'
import { Paper } from '@material-ui/core'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
 
class loginPage extends React.Component{
    state = {
        userdata : [],
        redirect : false,
        cart : 0,
        modalOpen : false,
        errormsg : ''
    }
    componentDidMount(){
        // this.getLoginData()
    }
    // getSaldo = (userid) =>{
    //     Axios.get('http://localhost:2000/users?username='+userid)
    //         .then((res)=>{
                
            
    //              return res.data[0].saldo
                
    //         }) 
    //         .catch((err)=>{
    //             return err
    //         })
    // }
    // getLoginData = () => {
    
    //     Axios.get('http://localhost:2000/users/')
    //     .then((res) => {
    //         console.log(res.data)
    //         this.setState({
    //             userdata : res.data
    //         })
    //         // console.log("ini userdata state", this.state.userdata)
            
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    validateUser = () => {
        var userid = this.refs.userIdLog.value
        var userpass = this.refs.userPassLog.value
      
        if(userid.replace(/\s/g, "") === "" || userpass.replace(/\s/g, "") === ""){
            this.setState({
                modalOpen : true,
                errormsg : "Semua Form Harus Diisi!"
            })
        }else{
            Axios.get('http://localhost:2000' + '/users?username=' + userid + '&password=' + userpass)
            .then((res)=> {
                if(res.data.length === 0){
                    console.log("not valid")
                    
                    return this.setState({
                        modalOpen : true,
                        errormsg : "Password / Username is not Valid!"
                    })
                }else {
                    this.setState({
                        redirect : true // SUPAYA PINDAH PAGE
                    })
                   
                    if(res.data[0].role === "user"){
                     
                        this.props.logUser(userid, res.data[0].saldo)
                        return this.props.updateCart(res.data[0].cart.length)
                    }else if(res.data[0].role === "admin"){
                        this.props.logAdmin(userid,res.data[0].saldo)
                        return this.props.updateCart(res.data[0].cart.length)
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        // this.state.userdata.map((val) => {
        //     if(userid === val.username && userpass === val.password){
        //         // VALID
        //         this.setState({
        //             redirect : true // SUPAYA PINDAH PAGE
        //         })
        //         isvalid = true
        //         if(val.role === "user"){
                    
        //             return this.props.logUser(val.username)

        //         }else if(val.role === "admin"){
                   
        //             return this.props.logAdmin(val.username)

        //         }else {

        //         }
        //     }
        // })

        // if(isvalid === false){
        //     // IS NOT VALID
        //     window.alert("not valid")
        // }


        
    }

    render(){
        
        const { redirect } = this.state
        if(redirect) {
            // this.props.updateCart(this.state.cart)
           return <Redirect to="/" push={true} />
        }
        if(this.props.IS_LOGGED_IN === true){
            // this.props.updateCart(this.state.cart)
            return <Redirect to="/"/>
        }
        return (
            
            
            <div className="mycontainer">
                <Modal isOpen={this.state.modalOpen} size="lg" style={{maxWidth: '700px', width: '80%'}} toggle={()=> this.setState({modalOpen : false})}>
                        <ModalHeader>
                            Error Message !
                        </ModalHeader>
                        <ModalBody>
                            <h1>{this.state.errormsg}</h1>
                        </ModalBody>
            
                </Modal>
                
                <div className='row justify-content-center mt-5'>
                    <div className="col-md-8">
                        <Paper className="p-5 mt-5">
                            <h1 className="mb-5">Log In</h1>
                            <input type="text" ref="userIdLog" className="form-control form-control-lg mt-3 mb-3" placeholder="username"></input>
                            <input type="password" ref="userPassLog" className="form-control form-control-lg mt-3 mb-5" placeholder="password"></input>
                            
                            <p className="mb-5" style={{color : "red", fontWeight : "bolder"}}> </p>
                            <input type="button" className="btn btn-outline-success btn-lg mt-3 mb-5" value="Submit" onClick={() => this.validateUser()}></input>
                            <Link to='/pages/register'>
                            <p className="mb-3" style={{textDecoration : "underline", color : "black"}}>Dont Have an Account ? Sign in now </p>
                            </Link>
 
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
 
// localhost:2000/users?username=enverd&&password=456456

export default connect(mapStateToProps, {logUser, logAdmin, updateCart})(loginPage);