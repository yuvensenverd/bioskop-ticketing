import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'


class movielist extends React.Component{
    state = {
        data : [],
        currentMovie : null,
        filtertext : "",
    }
    componentDidMount(){
        this.getDataMovies()
    }
    setCurrentMovie = (movienum) => {
        this.setState({
            currentMovie : movienum
        })
        console.log("Current Movie is " + this.state.currentMovie)
    }
    
    onFilterChange = (word) => {
        this.setState({
            filtertext : word
        })
    }
    getDataMovies = () => {
        Axios.get("http://localhost:2000/movies")
        .then((result)=>{
            
            this.setState({
                data : result.data 
            })
            
        })
        .catch((error) => {
            console.log(error)
        })
    }
    printMovieData = () => {
        var output = this.state.data
        .filter((val)=> {
            return val.title.toLowerCase().indexOf(this.state.filtertext.toLowerCase()) !== -1

        })
        
        .map((val) => {
            return(
        
                    <div className="col-md-3 mycard mr-4 ml-4 mb-3 mt-3">
                        <img src={val.image} alt='MovieImage' width='100%' height="422px" />
                        {/* <div class="logo"> {val.id} </div> */}
                        <div className="mycardtext">
                        <div className="mb-2" > {val.title} </div>
                        <div className="mb-3" style={{fontSize : "15px", fontWeight : "bold"}}> ENGLISH </div>
                        <p> <input type="button" style={{fontSize : "15px", fontWeight : "bold", marginBottom : "4px"}}className="buttongenre" value={val.genre}/></p>
                        {/*
                        FORMAT 
                        <Link to={{
                        pathname: '/yourPage',
                        state: [{id: 1, name: 'Ford', color: 'red'}]
                        }}> Your Page </Link> 
                         */}
                         </div>
                        <Link to={"/moviedetail?id=" + val.id}>
                        <p>
                            <input type="button" style={{height : "45px", fontWeight: "bolder", fontSize : "18px", backgroundColor : "#c02c3a", color : "white"}}className="btn btn-block" value="DETAILS" onClick={() => this.setCurrentMovie(val.id)} />
                        </p>
                        </Link>
                    </div>
                

            )
        })
        return output
    }
    render(){
        return (
            
            <div className='mycontainer pt-5'>
                <center>
                    <div className="d-flex flex-row justify-content-center">
                        {/* <div class="dropdown mt-3">
                            <button class="btn btn-danger btn-lg dropdown-toggle filtercss" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                FILTER BY
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div> */}
                        <div>
                            <input type="text" ref="filterbox" onChange={()=>this.onFilterChange(this.refs.filterbox.value)}  className="form-control form-control-lg mt-3 text-center" placeholder="Input title to filter..." style={{width : "650px", alignSelf: "center", borderRadius : "3px", height : "47px"}}></input>
                        </div>
                    </div>
                </center>
                
                <div className="row justify-content-center mt-4">
                {this.printMovieData()}

                
                </div>
                         
            </div>
        )
    }
}

export default movielist;

// class
// state
// lifecyscle
//function
//render