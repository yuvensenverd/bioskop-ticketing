import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import Axios from 'axios';
import PageNotFound from './../pages/PageNotFound'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { updateCart } from './../redux/actions/countActions'






class seatReservation extends React.Component{
    state = {
        seats : [],
        seatReserved : [],
        seatAvailable : [],
        currentMovie : "",
        seatBooked : [], // ["A2", "B5"],
        price : 35000,
        finishUpdate : false,
        currentDate : ""

        
    }
    componentDidMount = () => {

        if(this.props.location.state !== undefined){
            
            const moviename = this.props.location.state.movie
     
            Axios.get('http://localhost:2000/movies?title='+moviename)
            .then((res) => {
                var booked = res.data[0].booked
                var moviename = res.data[0].title
                var today = new Date()
                var date = today.getDate()+ '/'+(today.getMonth() + 1) + '/' + today.getFullYear()  
         
                this.setState({
                    seatBooked : booked,
                    currentMovie : moviename,
                    currentDate : date
                })
                console.log(this.state.currentDate)
            })
            .catch((err)=> {
                console.log(err)
            })
        
      
            // PRINT SEAT ID , PUSH TO STATE SEATS & SEATSAVAILABLE
            var alphabet = "ABCDEFGHIJ"
            var index = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
            for(var i = 0; i<alphabet.length; i++){
                for(var y = 0; y<index.length; y++){
                    var arr = alphabet[i]+index[y]
                    this.state.seats.push(arr)
                    if(this.state.seatReserved.indexOf(arr) !== -1 || this.state.seatBooked.indexOf(arr) !== -1 ){
                   
    
                    }else {
                        this.state.seatAvailable.push(arr)
                    }
                    
                }
            }
            
        }else{
            
        }
        
    }
    

    onClickSeat = (seatid) => {
        // KALO YANG DITEKAN SEAT YANG RESERVED
        if(this.state.seatReserved.indexOf(seatid) !== -1){
            
              this.setState({
                seatAvailable: this.state.seatAvailable.concat(seatid),
                seatReserved: this.state.seatReserved.filter((res) => { return res !== seatid})
              })
        }else {
        // KALO YANG DITEKAN SEAT AVAILABLE
            this.setState({
                seatReserved : this.state.seatReserved.concat(seatid),
                seatAvailable: this.state.seatAvailable.filter((res) => { return res !== seatid})
            })
        }
    }
    // masih test
    
    //background
    //hour slot
    //
    renderSeat = (value) =>{
        if(this.state.seatBooked.indexOf(value) === -1){

        
        return (
            <FontAwesomeIcon  size="2x" value={value} className={this.state.seatReserved.indexOf(value) !== -1 ? "seatreserved" : "seatavailable"} icon={faCouch} onClick={()=>this.onClickSeat(value)}></FontAwesomeIcon>
        )
        }else{
            return(
                <FontAwesomeIcon className="Booked" size="2x" value={value} icon={faCouch}></FontAwesomeIcon>
            )
        }
    }
    printSeatReservation = () => {
        var alphabet = "ABCDEFGHIJ"
        var listalphabet = alphabet.split("")
        var output = listalphabet.map((val)=>{
            return(
                <div className="row justify-content-center filtercss">
                            <div className="row-md-1 d-inline filtercss">
                            {val}
                            </div>
                            <div className="row-md-3 d-inline ml-5">
                                 {/* this.testing("val1") */}
                                 {this.renderSeat(val+"1")}
                                 {this.renderSeat(val+"2")}
                                 {this.renderSeat(val+"3")}
                                 {this.renderSeat(val+"4")}
                            </div>
                            <div className="row-md-5 d-inline mr-5 ml-5">
                                 {this.renderSeat(val+"5")}
                                 {this.renderSeat(val+"6")}
                                 {this.renderSeat(val+"7")}
                                 {this.renderSeat(val+"8")}
                                 {this.renderSeat(val+"9")}
                                 {this.renderSeat(val+"10")}
                                 {this.renderSeat(val+"11")}
                                 {this.renderSeat(val+"12")}
                                 {this.renderSeat(val+"13")}
                                 {this.renderSeat(val+"14")}
                            </div>
                            <div className="row-md-3 d-inline mr-5">
                                 {this.renderSeat(val+"15")}
                                 {this.renderSeat(val+"16")}
                                 {this.renderSeat(val+"17")}
                                 {this.renderSeat(val+"18")}
                                 
                            </div>
                            
                        
                        </div>
                        
                        
            )
        })
 
        return output
        
    }

    printProceed = () => {
        if(this.state.seatReserved.length === 0){
            return (
                
                <input type="button" className="form-control btn-secondary filtercss mb-5" value="Buy Ticket Before Proceed" disabled></input>
                
            )
            
        }else {
            return (
                // <Link to={{pathname : "/pages/transaction", state : {seatnumber : this.state.seatReserved, moviename : this.state.currentMovie}}}>
                    <input type="button" className="form-control btn-danger filtercss mb-5" value="Add to Cart" onClick={()=>this.addToCart()}></input>
                // {/* </Link> */}
            )
        }
    }

    addToCart = () => {
        Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
        .then((res)=>{
            var sama = false
            var cartuser = res.data[0].cart
            var arr = {
                date : this.state.currentDate,
                movtitle : this.state.currentMovie,
                seat : this.state.seatReserved,
                totalprice : this.state.price * this.state.seatReserved.length
            }
         
        
            res.data[0].cart.map((val, index)=>{
                if(arr.movtitle === val.movtitle){
                    // KALAU ADA MOVIE YANG TITLENYA SAMA DENGAN CART USER 
                    cartuser[index].totalprice = cartuser[index].totalprice + arr.totalprice
          
                    cartuser[index].seat = [...cartuser[index].seat, ...arr.seat]
        
                    sama = true
                    
                }
            })
            if ( sama === false ){
                cartuser.push(arr)
            }
            this.props.updateCart(cartuser.length)
            
            Axios.patch('http://localhost:2000/users/' + res.data[0].id, {cart : cartuser})
            .then((res)=>{
                
                this.setState({
                    finishUpdate : true
                })
                Axios.get('http://localhost:2000/movies?title='+this.state.currentMovie)
                .then((resmov)=>{
               
                    var moviebook = resmov.data[0].booked
                  
                    moviebook = [...resmov.data[0].booked, ...this.state.seatReserved]
                   
                    Axios.patch('http://localhost:2000/movies/'+resmov.data[0].id, {booked : moviebook})
                    .then((ress)=>{
                        console.log("Berhasil Seat ")
                    })
                })
                .catch((err)=>{

                })
            })
        })
        .catch((err)=>{

        })
    }
   
    
    render(){
        if(this.state.finishUpdate === true){
            return(
                <Redirect to={{pathname : "/pages/transaction", state : {seatnumber : this.state.seatReserved, moviename : this.state.currentMovie}}}>
                
                 </Redirect> 
            )
        }
        console.log(this.props.location.state)
        if(this.props.location.state === undefined){
         
            return (
              
                <PageNotFound/>
            )
        }
        return(
            <div className="mycontainer">
                <div className="container mt-5 pb-5">
                <div className="filtercss mb-5 badge badge-sm badge-danger text-center">
                        {this.state.currentMovie}
                </div>
                    <div className="col mb-5">
                        <div className="filtercss row-md-4 text-center mb-5" style={{fontSize : "40px"}}>
                              Available Seats
                        </div>
                        
                        {this.printSeatReservation()}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="mb-3 filtercss text-center" style={{backgroundColor : "grey", width: "250px", height: "30px"}}> Screen </div>

                    </div>
                    <div className="d-flex row justify-content-center filtercss mb-4" > <FontAwesomeIcon className="Booked" size="2x" icon={faCouch}></FontAwesomeIcon>&nbsp;&nbsp; = BOOKED &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon className="seatreserved" size="2x" icon={faCouch}></FontAwesomeIcon>&nbsp;&nbsp; = RESERVED&nbsp;&nbsp;&nbsp;&nbsp;  <FontAwesomeIcon className="seatavailable" size="2x" icon={faCouch}></FontAwesomeIcon>&nbsp;&nbsp; = AVAILABLE&nbsp;&nbsp;</div>
                    
                    
                    {this.printProceed()}
                    <div className="d-flex row justify-content-center">
                        <div className="justify-content-left filtercss mr-5 ">Total Price &nbsp;&nbsp;<input type="text" className="form-control mb-3" style={{width :"230px", fontWeight : "bolder", fontSize : "23px"}} value={"Rp. " + numeral(this.state.seatReserved.length*35000).format(0,0)}  readOnly></input></div>
                        <div className="justify-content-left filtercss mr-5 ">Number of Tickets  &nbsp;&nbsp;<input type="text" className="form-control" style={{width :"250px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.seatReserved.length + "  Tickets"}  readOnly></input></div>
                        <div className="justify-content-left filtercss mr-5 ">Seats Taken  &nbsp;&nbsp;<input type="text" className="form-control" style={{width :"350px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.seatReserved.join(",")} readOnly></input></div>
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
       saldouser : state.CURRENT_USER_DATA.saldo
    }
}

export default connect(mapStateToProps, {updateCart})( seatReservation);