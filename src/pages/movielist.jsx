import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'


class movielist extends React.Component{
    state = {
        data : [],
        currentMovie : null
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
        var output = this.state.data.map((val) => {
            return(
        
                    <div className="col-md-3 mycard mr-1 ml-1 mb-1 ">
                        <img src={val.image} alt='MovieImage' width='100%' height="422px"/>
                        <div class="logo"> {val.id} </div>
                        <div className="mb-2" style={{fontWeight : "bolder", fontFamily : "sans-serif", fontSize : "16px"}}> {val.title} </div>
                        <div className="mb-1" style={{fontSize : "11px", fontWeight : "bold"}}> English </div>
                        <p> <input type="button" className="buttongenre" value={val.genre}/></p>
                        {/*
                        FORMAT 
                        <Link to={{
                        pathname: '/yourPage',
                        state: [{id: 1, name: 'Ford', color: 'red'}]
                        }}> Your Page </Link> 
                         */}
                        <Link to={{pathname : "/moviedetail", data : val.id}}>
                        <p>
                            <input type="button" className="btn btn-danger btn-block" value="SHOWTIMES" onClick={() => this.setCurrentMovie(val.id)} />
                        </p>
                        </Link>
                    </div>
                

            )
        })
        return output
    }
    render(){
        return (
            
            <div className='container mt-5'>
                <h1>Movie List</h1>
                <div className="row justify-content-center">
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