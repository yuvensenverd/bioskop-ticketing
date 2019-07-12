import React from 'react'
import { Table } from 'reactstrap'
import numeral from 'numeral'
import Axios from 'axios';
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import { Transaksi, updateCart } from './../redux/actions/countActions'
import {Link } from 'react-router-dom'



class Transaction extends React.Component{
    state = {
        seat : [],
        moviename : [],
        price : 35000,
        redirect : false,
        cart : [] //{}
        
       
    }
    componentDidMount(){
  
     
        // AXIOS get & patch tambah isi cart
       
        // Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
        // .then((res)=>{
        //     var arr = res.data[0].cart
        //     var cart = {
        //         movtitle : this.state.moviename,
        //         seat : this.state.seat,
        //         totalprice : this.state.seat.length * this.state.price

        //     }

        //     arr.push(cart)
        //     arr.filter((val) => {return val.seat})
        //     console.log("dapet user")
        //     console.log(arr)

        //     Axios.patch('http://localhost:2000/users/'+ res.data[0].id, {cart : arr})
        //     .then((res)=>{
        //         console.log("Berhasil")
        //         this.setState({
        //             cart : arr,
        //             finishrender : true
        //         })
        //     })
        
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })

        Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
        .then((res)=>{
            console.log(res.data[0])
            this.setState({
                cart : res.data[0].cart
            })
            this.props.updateCart(res.data[0].cart.length)
        })
        .catch((err)=>{
            console.log(err)
        })
    
    }
    printCart = () => {
        // Map cart, yang sama 
        // Map di arr 
      
        var output = this.state.cart.map((value, index) => {
        
            
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{value.movtitle}</td>
                    <td>{value.seat.join(",  ") + "  (Total "+ value.seat.length+ "  Ticket)"}</td>
                    <td>{"Rp " + numeral(value.totalprice).format(0,0)}</td>
                </tr>
            
            
            
           
        )
        
    }
    )
        return output


        // var output = ''
        // for(var i = 0; i<this.state.cart.length; i++){
        //     var same = false
        //     for(var y = 0; y<arrhasil.length; y++){
        //         if(i === arrhasil[y]){
        //             same = true
        //             var arr = [...this.state.cart[i].seat , ...this.state.cart[i+1].seat]
        //             output = output + `
        //                 <tr>
        //                     <td>${i+1}</td>
        //                     <td>${this.state.cart[i].movtitle}</td>
        //                     <td>${arr.join(",  ") + "  (Total "+ arr.length+ "  Ticket)"}</td>
        //                     <td>${"Rp " + numeral(this.state.cart[i].totalprice + this.state.cart[i+1]).format(0,0)}</td>
        //                 </tr>
        //             `
        //         }
        //     }
        //     if(same === false){
        //         output = output + `
        //                  <tr>
        //                     <td>${i+1}</td>
        //                     <td>${this.state.cart[i].movtitle}</td>
        //                     <td>${this.state.cart[i].seat.join(",  ") + "  (Total "+ this.state.cart[i].seat.length+ "  Ticket)"}</td>
        //                     <td>${"Rp " + numeral(this.state.cart[i].totalprice).format(0,0)}</td>
        //                  </tr>
        //         `
        //     }
        // }
        // return output
        
        
    }

    mapTotal = () =>{
        var total = 0
        this.state.cart.map((val)=> {
            total = total + val.totalprice
        })
        return total
    }

    onCheckOut = () => {
        if(this.props.saldouser < (this.mapTotal())){
            return window.alert("Saldo Belum Mencukupi, Top Up Terlebih Dahulu")
        }
        //post ke movie
        // var booked = this.props.location.state.booked (dari data)
        // booked.push([])
        // Axion.patch('http://localhost:2000/movies'+this.props.location.state.id, {booked : booked})
        //.then((res)=>{})
        //.catch((err)=>{})
        // console.log([...arr1, ...arr2]) arr1 + arr2 
   
        Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
        .then((res)=>{
            var usercart = res.data[0].cart
            var cTransaction = res.data[0].transaction
            var transaction = [...cTransaction, ...usercart]
            Axios.patch('http://localhost:2000/users/'+res.data[0].id, {transaction : transaction})
            .then((res2)=>{
                var kosong = []
                
                var saldofinal = this.props.saldouser - this.mapTotal()
                this.props.Transaksi(-(this.mapTotal()))
                Axios.patch('http://localhost:2000/users/'+res.data[0].id, {cart : kosong, saldo : saldofinal}) // hapus cart
                .then((res3)=>{

                    this.props.updateCart(res3.data.cart.length) // Cart Length Kosong (Update di Redux)
                    window.alert("Checkout Berhasil")
                    this.setState({
                        redirect : true
                    })
                    
                })
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
            return(
                <Redirect to='/pages/loginPage'></Redirect>
            )
        }
        return(
            
                <div className="mycontainer">
                    <div className="text-center filtercss mt-5"> YOUR CART</div>
                   <Table dark className="mt-1">
                   
                       <thead>
                            <tr className="filtercss">
                                <td>No</td>
                                <td>Movie Name</td>
                                <td>Seat Number</td>
                                <td>Price</td>
                            </tr>
                       </thead>
                       <tbody>
                            {this.printCart()}
                           {this.state.cart.length !== 0 
                           ? 
                          
                    
                           <tr className="filtercss text-success"> 
                                <td></td>
                                <td></td>
                                <td>Total Price : </td>
                                <td>{"Rp " + numeral(this.mapTotal()).format(0,0)}</td>
                            </tr>
                          
                         
                            :
                            null
                           }
                            
                            
                       </tbody>
                       <tfoot></tfoot>
                       
                   </Table>
                    {this.state.cart.length === 0 
                    ? 
                    <div className='alert alert-secondary text-center'> YOUR CART IS STILL EMPTY <span style={{fontWeight : "bolder"}} > </span></div>
                    :
                    null
                
                }
                {this.state.cart.length !== 0
                ?
                <div>
                <Link to="/">
                <input type="button" className="form-control btn-lg btn filtercss mt-3" value="BUY MORE TICKET" style={{backgroundColor : "#c02c3a"}}></input>
                </Link>
                <input type="button" className="form-control btn-lg btn btn-success filtercss mt-3" value="CHECKOUT" onClick={()=>this.onCheckOut()}></input>
                </div>
                :
                <input type="text" className="form-control btn-lg  btn-secondary filtercss mt-3 text-center" value="Shop First before Checkout!" ></input>
                }
                   
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
export default connect(mapStateToProps, {Transaksi, updateCart})(Transaction);

// this.state.cart.map((val, index)=>{
        //     // MASUKIN KE AXIOS TIAP ITEM DI CART
        //     console.log("masuk" + index)
        //     Axios.get('http://localhost:2000/movies?title=' + val.movtitle)
        //     .then((res)=>{
        //         console.log("Masuk Movie")
        //         console.log(res.data)
        //         var seat = val.seat
        //         var booked = res.data[0].booked
        //         booked = [...booked, ...seat]
        //         console.log(booked)
        //         Axios.patch('http://localhost:2000/movies/'+res.data[0].id, {booked : booked })
        //         .then((res2)=>{
        //             console.log(res.data[0].title, " selesai movie")
        //             Axios.get('http://localhost:2000/users?username='+this.props.currentUser)
        //             .then((res2)=>{
        //                 var usercart = res2.data[0].transaction
        //                 console.log(val)
        //                 usercart.push(val)
        //                 console.log(usercart)
                       


        //                 //
        //                 var saldo = this.props.saldouser - val.totalprice
        //                 this.props.Transaksi(-(val.totalprice))
        //                 var kosong = []
        //                 Axios.patch('http://localhost:2000/users/'+res2.data[0].id, {transaction : usercart, saldo : saldo, cart : kosong})
        //                 .then((res)=>{
        //                     window.alert("checkout berhasil")
        //                     // DELETE CART
        //                     this.setState({
        //                         redirect : true
        //                     })
                        
        //                 })
        //             })
        //             .catch((err)=>{
        //                 console.log(err)
        //             })
        //         })
        //     })
        //     .catch((err)=>{

        //     })
        // })
