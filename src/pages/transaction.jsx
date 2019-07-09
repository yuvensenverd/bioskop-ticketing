import React from 'react'
import { Table } from 'reactstrap'
import numeral from 'numeral'
import Axios from 'axios';
import {Redirect} from 'react-router'
import {connect} from 'react-redux'



class Transaction extends React.Component{
    state = {
        seat : [],
        moviename : [],
        price : 35000,
        redirect : false
    }
    componentDidMount(){
        var listseat = this.props.location.state.seatnumber
        var moviename = this.props.location.state.moviename
        console.log(moviename)
        this.setState({
            seat : listseat,
            moviename : moviename
        })
    }
    printCart = () => {
        var output = this.state.seat.map((value, index) => {
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{this.state.moviename}</td>
                    <td>{value}</td>
                    <td>{"Rp " + numeral(this.state.price).format(0,0)}</td>
                </tr>
            )
        })
        return output
    }

    onCheckOut = () => {
        
        Axios.get('http://localhost:2000/movies?title='+this.state.moviename)
        .then((res)=> {
            var seat = this.state.seat
            console.log(res.data[0].booked)
            for(var i = 0; i< seat.length; i++){
                res.data[0].booked.push(seat[i])
            }
            console.log(res.data[0].booked)
           
            Axios.put('http://localhost:2000/movies/' + res.data[0].id, res.data[0])
            .then((result) => {
                
                console.log(result.data)
                Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
                .then((rez)=>{
                    console.log("get user")
                    var transaction = {
                        movId : res.data[0].id ,
                        ticket : this.state.seat.length,
                    }
                    var restransaction = rez.data[0].transaction
                    restransaction.push(transaction)
                    rez.data[0].transaction = restransaction

                    Axios.put('http://localhost:2000/users/'+ rez.data[0].id, rez.data[0])
                    .then((finalres)=>{
                        console.log("put user berhasil")
                        window.alert("Checkout Berhasil")
                        this.setState({
                            redirect : true
                        })
                        console.log(finalres)
                    })
                    .catch((err4)=>{
                        console.log(err4)
                    })
                })
                .catch((err3)=>{
                    console.log(err3)
                })
            })
            .catch((err2)=>{
                console.log(err2)
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
        return(
            
                <div className="mycontainer">
                
                   <Table dark className="mt-5">
                 
                       <thead>
                            <tr>
                                <td>No</td>
                                <td>Movie Name</td>
                                <td>Seat Number</td>
                                <td>Price</td>
                            </tr>
                       </thead>
                       <tbody>
                            {this.printCart()}
                            <tr className="filtercss"> 
                                <td></td>
                                <td></td>
                                <td>Total Price : </td>
                                <td>{"Rp " + numeral(this.state.seat.length * this.state.price).format(0,0)}</td>
                            </tr>
                       </tbody>
                       <tfoot></tfoot>
                       
                   </Table>
                   <input type="button" className="form-control btn-lg btn btn-success filtercss" value="CHECKOUT" onClick={()=>this.onCheckOut()}></input>
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
export default connect(mapStateToProps)(Transaction);