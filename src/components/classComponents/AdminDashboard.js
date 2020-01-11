import React, { Component } from 'react'
import axios from 'axios';
import Loader from '../../assets/Loader.gif'

const tableStyle = {
    fontFamily: 'arial',
    borderCollapse: 'collapse',
    width: '80%',
    margin: '1em auto'
}

const tdth = {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px'
}

class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customerDetailsList: [],
            showLoader: true
        }
    }

    componentDidMount() {
        this.getCustomerList();
    }
    
    
    getCustomerList = () => {
        this.setState({
            showLoader: true
        })
        axios.get(`http://www.mocky.io/v2/5d4040a03300003e239d2afe`)
        .then(response => {
            this.setState({
                customerDetailsList : response.data.map(customerDetails => {
                        return  <tr key={customerDetails.email}>
                                    <td style={tdth}>{customerDetails.userName}</td>
                                    <td style={tdth}>{customerDetails.address}</td>
                                    <td style={tdth}>{customerDetails.email}</td>
                                    <td style={tdth}>{customerDetails.accountType}</td>
                                </tr>
                }),
                showLoader: false
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                showLoader: false
            })
        })
    }


    render() {

        return (
            <div>
                <h1>Welcome Admin</h1>
                { this.state.showLoader===false ? 
                    <table style={tableStyle}>
                        <tbody>
                            <tr>
                                <th style={tdth}>Name</th>
                                <th style={tdth}>Address</th>
                                <th style={tdth}>Email ID</th>
                                <th style={tdth}>Account Type</th>
                            </tr> 
                            {this.state.customerDetailsList}
                        </tbody>
                    </table> :
                    <div><img src={Loader} alt="Loading User List"/></div>
                }
            </div>
        )
    }
}

export default AdminDashboard
