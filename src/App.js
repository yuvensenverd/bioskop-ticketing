import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/header'
import MovieList from './pages/movielist'
import { Route , Link } from 'react-router-dom'
import manageMovie from './admin/manageMovie';
import moviedetail from './pages/moviedetail'

function App() {
  return (
    <div>
      <Header></Header>
      <Route path='/' exact component={MovieList}></Route>
      <Route path='/manage' component={manageMovie}></Route>
      <Route path='/moviedetail' component={moviedetail}></Route>
    </div>
  );
}

export default App;
