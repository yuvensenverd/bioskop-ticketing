import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'





class seatReservation extends React.Component{
    state = {
        seats : [],
        seatReserved : [],
        seatAvailable : [],
        currentMovie : [],
        seatBooked : []
    }
    componentDidMount = () => {
      
    
  
        // PRINT SEAT ID , PUSH TO STATE SEATS & SEATSAVAILABLE
        var alphabet = "ABCDEFGHIJ"
        var index = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        for(var i = 0; i<alphabet.length; i++){
            for(var y = 0; y<index.length; y++){
                var arr = alphabet[i]+index[y]
                this.state.seats.push(arr)
                if(this.state.seatReserved.indexOf(arr) !== -1 ) {
                    console.log("Masuk")

                }else {
                    this.state.seatAvailable.push(arr)
                }
                
            }
        }
        
        
    }
    

    onClickSeat = (seatid) => {
        if(this.state.seatReserved.indexOf(seatid) !== -1){
            
              this.setState({
                seatAvailable: this.state.seatAvailable.concat(seatid),
                seatReserved: this.state.seatReserved.filter((res) => { return res != seatid})
              })
        }else {
            this.setState({
                seatReserved : this.state.seatReserved.concat(seatid),
                seatAvailable: this.state.seatAvailable.filter((res) => { return res != seatid})
            })
        }
    }
    getMovie = () =>{
        // GET CURRENT MOVIE FROM PREVIOUS PAGE
        const moviename = this.props.location.state.movie
        return moviename
    }
    //background
    //hour slot
    //
    renderSeat = (value) =>{
        if(this.state.seatBooked.indexOf(value) === -1){

        
        return (
            <FontAwesomeIcon className="seaticon" size="2x" value={value} className={this.state.seatReserved.indexOf(value) !== -1 ? "seatreserved" : "seatavailable"} icon={faCouch} onClick={()=>this.onClickSeat(value)}></FontAwesomeIcon>
        )
        }else{
            return(
                <FontAwesomeIcon className="seaticon" size="2x" value="Booked" icon={faCouch}></FontAwesomeIcon>
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
   
    
    render(){
        return(
            <div className="mycontainer">
                <div className="container mt-5">
                {/* <div className="filtercss mb-5 badge badge-sm badge-danger text-center">
                        {this.getMovie()}
                </div> */}
                    <div className="col mb-5">
                        <div className="filtercss row-md-4 text-center mb-5" style={{fontSize : "40px"}}>
                              Available Seats
                        </div>
                        
                        {this.printSeatReservation()}
                    </div>
                    <Link to={{pathname : "/pages/transaction", state : {seatnumber : this.state.seatReserved, moviename : this.props.location.state.movie}}}>
                    <input type="button" className="form-control btn-danger filtercss mb-4" value="PROCEED"></input>
                    </Link>
                    
                    <div className="justify-content-left filtercss ">Number of Tickets : &nbsp;&nbsp;<input type="text" className="form-control" style={{width :"150px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.seatReserved.length + "  Tickets"}  readOnly></input></div>
                    <div className="justify-content-left filtercss mt-5">Seats Taken : &nbsp;&nbsp;<input type="text" className="form-control" style={{width :"250px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.seatReserved.join(",")} readOnly></input></div>
                </div>
                
               
            </div>
            
        )
    }
}

export default seatReservation;