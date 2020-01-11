import React, { Component } from 'react'
import Logout from './Logout'
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    render() {
        
        console.log(this.props)
        return (
            <div>
                {this.props.accountType==='Customer' ? <CustomerDashboard {...this.props}/> : <AdminDashboard {...this.props}/>}
                <Logout logout={this.props.logout}/>
            </div>
        )
    }
}

export default Dashboard