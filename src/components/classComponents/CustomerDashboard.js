import React, { Component } from 'react'

class CustomerDashboard extends Component {

    render() {
        
        let statement = `Welcome ${this.props.userName}!
        Your Account is Registered with Email ID -  ${this.props.email}`;
        return (
            <div>
                <h1>{statement}</h1>
                <div>Address : {this.props.address}</div><br/>
            </div>
        )
        
    }

}

export default CustomerDashboard
