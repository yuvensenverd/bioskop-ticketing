import React from 'react'

class moviedetail extends React.Component{
    render(){
        return(
            <div>
            {/* TO GET THE DATA PASS FROM THE LINK IN MOVIEDETAIL , THIS.PROPS.LOCATION.{VAR NAME} */}
            <h1>{this.props.location.data} </h1>
            </div>
        )
    }
}

export default moviedetail