import React from 'react'

class moviedetail extends React.Component{
    render(){
        return(
            <div>
            <h1>{this.props.location.data}</h1>
            </div>
        )
    }
}

export default moviedetail