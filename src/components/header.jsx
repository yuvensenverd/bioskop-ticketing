import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import numeral from 'numeral'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserLogOut, Transaksi } from './../redux/actions/countActions'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios'



// LOGIN ID LAIN BLM UPDATE
// CHECKOUT BLM UPDATE

// REACT HOOKS
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modalOpen : false,
      statesaldo : this.props.saldouser
      
    };
  }
  componentDidUpdate =() => {

    // this.setState({
    //   statesaldo : this.props.saldouser
    // })
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  closeModal =() => {
    this.setState({
      modalOpen : false
    })
  }
  onClickTopUp = () => {
    var saldo = parseInt(this.refs.reftopup.value)
    saldo = saldo + this.props.saldouser
    console.log(saldo)
   
    // Axios.patch('http://localhost:2000/users/2', {saldo : saldo})
    // .then((res)=>{
    //   window.alert("top up berhasil")

      
    // })

    Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
    .then((res)=>{
      console.log(res.data)
      Axios.patch('http://localhost:2000/users/'+res.data[0].id, {saldo : saldo})
      .then((res)=>{
        this.setState({
          statesaldo : saldo
        })
        this.props.Transaksi(parseInt(this.refs.reftopup.value))
        window.alert("Top Up Berhasil")
        this.closeModal()
        
      })
    })
    .catch((err)=>{

    })
    
    
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '800px', width: '80%'}}>
        <ModalHeader>
            Top Up Saldo
        </ModalHeader>
        <ModalBody>
            <div> Jumlah Saldo </div>
            <input type="text"  className="form-control mb-4" placeholder="saldo" value={this.props.saldouser} disabled/>
            <input type="number" ref="reftopup" className="form-control mb-2" placeholder="Jumlah Top Up"/>
         

            {/* <input type="number" ref="inputpt" min="1" max="24" className="form-control mb-2" placeholder="Playtime" /> */}
                          
                            
                            
            <p id="warningbutton" style={{color : "red"}}> </p>
        </ModalBody>
        <ModalFooter>
        <input type="button" value="TOP UP" className="btn btn-success " onClick={()=>this.onClickTopUp()} />
        <input type="button" value="CANCEL" className="btn btn-danger" onClick={()=>this.closeModal()} />
        </ModalFooter>
         </Modal>
        <Navbar  className="navbarheader" expand="md" style={{height: "45px"}} >
        <Link to='/' className="headername">
          <NavbarBrand  className="headername" style={{color : "#ff4422", fontSize : "20px", fontWeight : "bolder"}}>Home</NavbarBrand>
        </Link>
          <NavbarToggler onClick={this.toggle} />
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto " navbar>
            
            {/*  DROPDOWN UNTUK STATE LOGGIN FALSE & LOGGIN TRUE */}
            <UncontrolledDropdown className="headername mr-4" nav inNavbar>
                <DropdownToggle className="headername" nav caret>
                {this.props.currentUser !== "" && this.props.IS_LOGGED_IN === true
                ?
                "Welcome, " + this.props.currentUser 
                :
                this.props.IS_LOGGED_IN === false
                ?
                "You are currently not Logged in"
                :
                null
                }
                </DropdownToggle>
                {/*  */}
                <DropdownMenu style={{backgroundColor : "lightgrey"}} right>
                  <DropdownItem>
                {this.props.currentUser !== "" && this.props.IS_LOGGED_IN === true
                ?
                <div>
                <DropdownItem className="headername">
                  <Link to="/">
                    <p onClick={() => this.props.UserLogOut()}>Logout</p>
                    
                    {/* Function Here */}
                  </Link>
                </DropdownItem>
               
                </div>
                :
                this.props.IS_LOGGED_IN === false
                ?
                <div>
                <DropdownItem className="headername">
                  <Link to="/pages/register">
                    Register
                  </Link>
                </DropdownItem>
                <DropdownItem className="headername">
                <Link to="/pages/loginPage">
                    Login
                  </Link>
                </DropdownItem>
                </div>
                :
                null
                }
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
             
              {this.props.IS_ADMIN === true ?
              <div className="headername  justify-content-center pt-2">
                <Link to='/manage' className="headername mr-3">
                    MANAGE 
                </Link>
              </div>
              :
              this.props.IS_ADMIN === false ?
              <div></div>
              :
              null
              }
                
            {/* UNTUK MENGHILANGKAN LOGIN LINK */}
            {this.props.IS_LOGGED_IN === false ? 
            <div className="row headername">
            <NavItem className="pl-3">
            <Link to='/pages/loginPage'>
            <NavLink className="headername"  style={{color : "white", fontWeight : "bolder"}}>LOGIN</NavLink>
            </Link>
            </NavItem>
            <NavItem className="pl-3">
            <Link to='/pages/register'>
            <NavLink className="headername" style={{color : "white", fontWeight : "bolder"}}>REGISTER</NavLink>
            </Link>
            </NavItem>
            </div>
            
            :
            this.props.IS_LOGGED_IN === true ?
            <div></div>
            :
            null
              }

            {/* {this.props.IS_LOGGED_IN === true ? 
            <div className="headername  justify-content-center pt-2">
            <Link to={'/history'} className="headername mr-4">
                History
            </Link>
            </div>
            :
            null
            } */}


            {this.props.IS_LOGGED_IN === false ? 
            null
          :
            <div className="headername  justify-content-center ">
              <UncontrolledDropdown className="headername " nav inNavbar>
                <DropdownToggle className="headername" nav caret>
                {"Saldo : Rp. " + numeral(this.props.saldouser).format(0,0)} 
                </DropdownToggle>
                    <DropdownMenu style={{backgroundColor : "lightgrey"}} right>
                      <DropdownItem className="headername filtercss" style={{color : "black"}}>
               
                  <p onClick={() => this.setState({modalOpen : true})}>Top Up Saldo</p>
                  
                  {/* Function Here */}
              
                    </DropdownItem>
                      <DropdownItem className="headername filtercss" >
                          <Link to={'/history'} style={{color : "black"}} >
                                History
                          </Link>
                      </DropdownItem>
                    </DropdownMenu>
              </UncontrolledDropdown>
           
            </div>
          }
            
            
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
       currentUser : state.CURRENT_USER_DATA.currentUser,
       IS_ADMIN : state.CURRENT_USER_DATA.IS_ADMIN,
       IS_LOGGED_IN : state.CURRENT_USER_DATA.IS_LOGGED_IN,
       saldouser : state.CURRENT_USER_DATA.saldo
       
    }
}

export default connect(mapStateToProps, { UserLogOut, Transaksi })(Header);