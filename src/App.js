import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/header'
import MovieList from './pages/movielist'
import { Route , Link } from 'react-router-dom'
import manageMovie from './admin/manageMovie';
import moviedetail from './pages/moviedetail'
import loginPage from './pages/loginPage';
import register from './pages/register'
import seatReservation from './pages/seatReservation'
import { Url } from './support/url'
import Axios from 'axios';
import { logUser, logAdmin } from './redux/actions/countActions'
import { connect } from 'react-redux'
import transaction from './pages/transaction'
import { statement } from '@babel/template';
import historytransaction from './pages/historyTransaction'


class App extends React.Component{
  componentDidMount(){
    
    var username = localStorage.getItem('username')
    if(username !== null){
      Axios.get(Url + '/users?username=' + username)
      .then((res)=> {
        if(res.data[0].role === "user"){
          this.props.logUser(res.data[0].username)
        }else if(res.data[0].role === "admin"){
          this.props.logAdmin(res.data[0].username)
        }
      })
      .catch((err) =>{

      });
      
    }
  }
  render(){
    if(this.props.currentUser === "" && localStorage.getItem('username') != null){
      return (
        <p> Loading ... </p>
      )
    }
  return (
    <div>
      <Header></Header>
      <Route path='/' exact component={MovieList}></Route>
      <Route path='/manage' component={manageMovie}></Route>
      <Route path='/moviedetail' component={moviedetail}></Route>
      <Route path='/pages/loginPage' component={loginPage}></Route>
      <Route path='/pages/register' component={register}></Route>
      <Route path='/pages/seatReservation' component={seatReservation}></Route>
      <Route path='/pages/transaction' component={transaction}></Route>
      <Route path='/history' component={historytransaction}></Route>
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

export default connect(mapStateToProps, {logUser, logAdmin}) (App);
