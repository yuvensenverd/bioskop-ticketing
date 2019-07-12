import React from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class HistoryTransaction extends React.Component{
    state = {
        userdata : [],
        movielist : [],
        err : "",
        modalOpen : false,
        currentIndex : 0,
        Loading : true,
      
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users?username='+ this.props.currentUser)
        .then((res)=>{
            var history  = res.data[0].transaction
            this.setState({
                userdata : history
            })
            if(this.state.userdata.length === 0){
                this.setState({
                    err : "You have no transaction yet !"
                })
            }
            console.log(this.state.userdata)
            this.setState({
                Loading : false
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })

        // Axios.get('http://localhost:2000/movies')
        // .then((res)=>{
        //   var listorder =  res.data.sort((a,b)=>{
        //         return (a.id) - (b.id)
        //     }) // SORT ASCENDING
         
        //     var arr = []
        //     listorder.map((val)=>{
        //         arr.push(val.title)
        //     })
        //     this.setState({
        //         movielist : arr
        //     })
            

        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        
       
    }
    printTotal =(arr) => {
        //[{},{}]
        var total = 0 
        for(var i =0; i<arr.length; i++){
            total = total + arr[i].totalprice
        }
     
        return total
    }

    printDetail =(index)=>{
        this.setState({
            modalOpen : true,
            currentIndex : index
        })
    }

    printhistory = () =>{
        console.log(this.state.userdata)
        if(this.state.userdata.length !== 0){
            
            var jsx = this.state.userdata.map((val,index)=> {
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{this.state.userdata[index][0].date}</td>
                        <td>{this.state.userdata[index].length}</td>
                        <td>{"Rp. "+ numeral(this.printTotal(this.state.userdata[index])).format(0,0) }</td>
                        <td><input type="button" value="detail" className="btn btn-md btn-info" onClick={()=>this.printDetail(index)}></input></td>
                    </tr>
                )
            })
            return jsx
        }else {
            
           
                
        }
        
    }

    mapTotal = () =>{
        var total = 0
        this.state.userdata.map((val,index)=>{
            this.state.userdata[index].map((val2)=>{
                total = total + val2.totalprice
            })
        })
        return total
    }

    printModal = (i) => {
        if(this.state.Loading === false && this.state.userdata.length !== 0){

            console.log(this.state.userdata)
            var output = this.state.userdata[i].map((val,index)=>{
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{val.movtitle}</td>
                        <td>{val.seat.join(", ") + " (Total " + val.seat.length + " Ticket)"}</td>
                        <td>{"Rp. "+ numeral(val.totalprice).format(0,0)}</td>
                    </tr>
                )
            })
            return output
        }
    }


    render(){
        if(this.props.IS_LOGGED_IN === false){
            return(
                <div className="filtercss text-center pt-5"> Hanya User yang sudah Login yang dapat mengakses </div>
            )
        }
        return(
            <div>
                 <Modal isOpen={this.state.modalOpen} size="lg" style={{maxWidth: '1200px', width: '80%'}} toggle={()=> this.setState({modalOpen : false})}>
                        <ModalHeader>
                            YOUR TRANSACTION DETAILS
                        </ModalHeader>
                        <ModalBody>
                        <Table light className="mt-3">
             
                                <thead>
                                    <tr className="font-weight-bolder">
                                        <td>No</td>
                                        <td>Title</td>
                                        <td>Qty</td>
                                        <td>Subtotal</td>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.printModal(this.state.currentIndex)}
                                </tbody>
                        </Table>
                            
                            <p id="warningbutton" style={{color : "red"}}> </p>
                        </ModalBody>
                        
                    </Modal>
            
            <div className="mycontainer">
                <h1 className="text-light text-center mt-5"> Your Transaction History</h1>
               <Table dark className="mt-3">
             
                   <thead>
                        <tr className="filtercss">
                            <td>No</td>
                            <td>Date</td>
                            <td>Total Items (Movie)</td>
                            <td>Total Price</td>
                            <td>Detail</td>
                        </tr>
                   </thead>
                   <tbody>
                        
                        {this.printhistory()}
                        <tr className="filtercss text-success"> 
                                <td></td>
                                <td></td>
                                <td>Total Money Spent : </td>
                                <td>{"Rp " + numeral(this.mapTotal()).format(0,0)}</td>
                                <td></td>
                     </tr>
                        
                   </tbody>
                   
                   
               </Table>
               {
                            this.state.err === '' 
                            ?
                            <p></p>
                            :
                            this.state.err !== ''
                            ?
                            <div className='alert alert-black filtercss text-center'> {this.state.err} <span style={{fontWeight : "bolder", cursor : 'pointer', float : "right", height : "150px"}} ></span></div>
                            :
                            null}
                
               
               </div>
           
        
    )


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

export default connect(mapStateToProps)(HistoryTransaction);