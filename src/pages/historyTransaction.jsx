import React from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'


class HistoryTransaction extends React.Component{
    state = {
        userdata : [],
        movielist : [],
        err : ""
     
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

    printhistory = () =>{
        console.log(this.state.userdata)
        if(this.state.userdata.length !== 0){
            
            var jsx = this.state.userdata.map((val,index)=> {
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{this.state.userdata[index].movtitle}</td>
                        <td>{val.seat.join(" ,")+ "   (" + val.seat.length + " Ticket)"}</td>
                        <td>{"Rp. " + numeral(val.totalprice).format(0,0)}</td>
                    </tr>
                )
            })
            return jsx
        }else {
            
           
                
        }
        
    }

    mapTotal = () =>{
        var total = 0
        this.state.userdata.map((val)=>{
            total = total + val.totalprice
        })
        return total
    }


    render(){
        return(
            <div>
                   
            
            <div className="mycontainer">
                <h1 className="text-light text-center mt-5"> Your Transaction History</h1>
               <Table dark className="mt-3">
             
                   <thead>
                        <tr className="filtercss">
                            <td>No</td>
                            <td>Movie Name</td>
                            <td>Total Ticket</td>
                            <td>Total Price</td>
                        </tr>
                   </thead>
                   <tbody>
                        
                        {this.printhistory()}
                        <tr className="filtercss text-success"> 
                                <td></td>
                                <td></td>
                                <td>Total Money Spent : </td>
                                <td>{"Rp " + numeral(this.mapTotal()).format(0,0)}</td>
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
                            <div className='alert alert-black filtercss text-center'> {this.state.err} <span style={{fontWeight : "bolder", cursor : 'pointer', float : "right", height : "150px"}} onClick={()=>{this.setState({err : ""})}}> X</span></div>
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