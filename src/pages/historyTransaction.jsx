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
        price : 35000
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users?username='+ this.props.currentUser)
        .then((res)=>{
            var history  = res.data[0].transaction
            this.setState({
                userdata : history
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })

        Axios.get('http://localhost:2000/movies')
        .then((res)=>{
          var listorder =  res.data.sort((a,b)=>{
                return (a.id) - (b.id)
            }) // SORT ASCENDING
         
            var arr = []
            listorder.map((val)=>{
                arr.push(val.title)
            })
            this.setState({
                movielist : arr
            })
            

        })
        .catch((err)=>{
            console.log(err)
        })
        
       
    }

    printhistory = () =>{
        console.log(this.state.userdata)
        var jsx = this.state.userdata.map((val,index)=> {
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{this.state.movielist[val.movId-1]}</td>
                    <td>{val.ticket}</td>
                    <td>{"Rp. " + numeral(this.state.price * val.ticket).format(0,0)}</td>
                </tr>
            )
        })
        return jsx
    }


    render(){
        return(
            <div>
                   
            
            <div className="mycontainer">
            
               <Table dark className="mt-5">
             
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
                        
                   </tbody>
                   
                   
               </Table>
               
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