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

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserLogOut } from './../redux/actions/countActions'







// REACT HOOKS
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  componentDidUpdate =() => {
    console.log(this.props)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
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
                <DropdownItem className="headername">
                  <Link to="/">
                    <p onClick={() => this.props.UserLogOut()}>Logout</p>
                    
                    {/* Function Here */}
                  </Link>
                </DropdownItem>
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
              <div className="headername mr-4 justify-content-center pt-2">
                <Link to='/manage' className="headername mr-4">
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

            {this.props.IS_LOGGED_IN === true ? 
            <div className="headername  justify-content-center pt-2">
            <Link to={'/history'} className="headername mr-4">
                History
            </Link>
            </div>
            :
            null
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
       IS_LOGGED_IN : state.CURRENT_USER_DATA.IS_LOGGED_IN
       
    }
}

export default connect(mapStateToProps, { UserLogOut })(Header);