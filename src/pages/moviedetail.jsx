import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class moviedetail extends React.Component{
    state={
        data : [],
        login : true,
        modalOpen : false,
        buyTicket : false
        
    }

    componentDidMount(){
        var idmovie = this.props.location.search.replace("?id=", "") // Try this.props
        Axios.get("http://localhost:2000/movies/"+idmovie)
        .then((res)=>{
            this.setState({
                data : res.data
                
            })
            console.log(this.state.data)
            
        })
        .catch((err)=> {
            console.log(err)
        })
        
        
    }

    playingTimeRender = (val) => {
      
      var arr = [val]
      return arr.join(',')
    }
    onButtonTicketClick = () => {
        if(this.props.IS_LOGGED_IN === false){

        
        this.setState({
            login : false
        })
        
        }
        else if(this.props.IS_LOGGED_IN === true){
        
        this.setState({
            buyTicket : true
        })
        }

    }
    openModal = () => { 
        this.setState({
            modalOpen : true
        })
    }
    closeModal = () => {
        this.setState({
            modalOpen : false
        })
    }
    render(){
        //if(this.state.data == null){<p> Loading </p>}
        if(this.state.login === false){
            return <Redirect to='/pages/loginPage'></Redirect>
        }
        if(this.state.login === true && this.state.buyTicket === true){
            return <Redirect to={{pathname : '/pages/seatReservation', state:{movie : this.state.data.title}}}></Redirect>
        }
        
        //MODAL
      
        return(
        <div className="mycontainer">
            {/* height 400px */}
            <div className="banner">
                
                <img src={this.state.data.bannerimg} class="img-fluid" width="100%" alt="whatever"></img>
                <div onClick={()=>this.openModal()} className="logobanner">Preview Trailer   <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon></div>
                <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '1600px', width: '80%'}}>
                    <iframe class="embed-responsive" width="1500px" height="800px" src={this.state.data.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Modal>
            </div> 
            <div className="container mt-5  p-0">
            {/* TO GET THE DATA PASS FROM THE LINK IN MOVIEDETAIL , THIS.PROPS.LOCATION.{VAR NAME} */}
           
                <div className="row">
                    <div className="col-md-4 p-4">
                        <img class="img-fluid" src={this.state.data.image} height="100%" width="100%" alt=""></img>
                    </div>
                    <div className="col-md-8 p-4">
                        <div className="text-light">
                        <h1 className="mb-3">{this.state.data.title}</h1>
                        <div className="badge badge-pill badge-danger mb-3" style={{fontSize : "20px"}}>{this.state.data.genre}</div>
                        <div class="h3 mb-4">Director : {this.state.data.director}</div>
                        <div className="badge badge-pill badge-secondary mb-3" style={{fontSize : "15px"}}>{this.state.data.duration} Minutes </div>
                        <p className="mb-4" > Playing At : {this.playingTimeRender(this.state.data.playingTime)}</p>
                        <div class="h3 mb-4" style={{fontWeight : "bolder"}}>Synopsis</div>
                        <p className="mb-4" style={{fontStyle : "italic"}}>{this.state.data.synopsis}</p>
                        </div>
                        
                    </div>
                    <input type="button" className="form-control btn-success mb-5" style={{fontSize : "20px", fontWeight : "bolder"}} value="BUY TICKET" onClick={() => this.onButtonTicketClick()}></input>
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

export default connect(mapStateToProps)(moviedetail)