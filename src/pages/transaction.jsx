import React from 'react'
import { Table } from 'reactstrap'


class Transaction extends React.Component{
    state = {
        seat : [],
        moviename : []
    }
    componentDidMount(){
        
    }
    printCart = () => {
        
    }
    render(){
        return(
            
                <div className="mycontainer">
                
                   <Table dark className="mt-5">
                       <thead>
                            <tr>
                                <td>No</td>
                                <td>Movie Name</td>
                                <td>Seat Number</td>
                                <td>No of tickets</td>
                                <td>Price</td>
                            </tr>
                       </thead>
                       <tbody>
                            {this.printCart()}
                       </tbody>
                       
                   </Table>
                   <input type="button" className="form-control btn-lg btn btn-success filtercss" value="CHECKOUT"></input>
                   </div>
               
            
        )
    }
}

export default Transaction;