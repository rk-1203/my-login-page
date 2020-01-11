import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userName : '',
      accountType : '',
      email : '',
      address : '',
      password : '',
      confirmPassword : '',
      isLoggedIn : false,
      isButtonDisable : true,
      userNameValid : false,
      accountTypeValid : false,
      emailValid : false,
      addressValid : false,
      passwordValid : false,
      confirmPasswordValid : false,
      showloader : false,
      emailErrorMsg : '',
      loginErrorMsg : '',
      confirmPasswordErrorMsg : ''
    }
  }

  // handleSubmit = (event) => {
  //   this.setState({
  //       showloader : true
  //   })
  //   setTimeout( () => {
  //       axios.get('https://demo7189719.mockable.io/login')
  //       .then(response => {
  //           console.log(response)
  //           console.log(response.data)
  //           let i=0;
  //           for(i=0;i<response.data.length;i++) {
  //               if(response.data[i].email===this.state.email && response.data[i].password===this.state.password) {
  //                   this.setState({
  //                       isLoggedIn : true,
  //                       loginErrorMsg : '',
  //                       userName : response.data[i].userName,
  //                       address : response.data[i].address,
  //                       showloader : false
  //                   })
  //                   break;
  //               }
  //           }
  //           if(i===response.data.length)
  //           {
  //               this.setState({
  //                   isLoggedIn : false,
  //                   loginErrorMsg : 'Wrong Credentials!',
  //                   showloader : false
  //               })
  //           }
  //           //this.setState({posts: response.data})
  //       })
  //       .catch(error => {
  //           console.log(error)
  //           this.setState({
  //               loginErrorMsg : 'Error Fetching Data...Check Your Internet Connection!!',
  //               showloader : false
  //           })
  //           //this.setState({errorMsg: 'Error retreiving data'})
  //       })
  //   //alert(`Welcome ${this.state.userName}!, Your Account is Registered with Email ID -  ${this.state.email}`)
  //   }, 1000);
    
  //   event.preventDefault()
  // }

  handleUsernameChange = (event) => {
    if(event.target.value===''){
      this.setState({
        userName : event.target.value,
        userNameValid : false
      },() => {console.log('usernameValid '+this.state.userNameValid+' name '+this.state.userName+' '+this.state.userName.localeCompare(""));
      this.checkall();})
    } else {
      this.setState({
        userName : event.target.value,
        userNameValid : true
      },() => {console.log('usernameValid '+this.state.userNameValid+' name '+this.state.userName+' '+this.state.userName.localeCompare(""));
      this.checkall();})
    }
  }

  handleAccountTypeChange = (event) => {
    if(event.target.value!=='') {
      this.setState({
        accountType: event.target.value,
        accountTypeValid: true
      },() => {console.log(this.state.accountType);
        this.checkall()})
    } else {
      this.setState({
        accountType: event.target.value,
        accountTypeValid: false
      },() => this.checkall())
    }
  }

  handleEmailChange = (event) => {
    //regex check for valid email ID
    if(event.target.value==='') {
        this.setState({
            email : event.target.value,
            emailValid : false,
            emailErrorMsg : ``
        },() => {this.checkall();})
    }
    else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)) { 
        this.setState({
            email : event.target.value,
            emailValid : true,
            emailErrorMsg : ''
        },() => {console.log(this.state.emailValid);this.checkall();})
    } else {
        this.setState({
            email : event.target.value,
            emailValid : false,
            emailErrorMsg : `Enter a valid Email`
        },() => {this.checkall();})
    }
  }

  handleAddressChange = (event) => {
    if(event.target.value===''){
      this.setState({
        address : event.target.value,
        addressValid : false
      },() => {console.log(this.state.addressValid);this.checkall()})
    } else {
      this.setState({
        address : event.target.value,
        addressValid : true
      },() => this.checkall())
    }
  }

  handlePasswordChange = (event) => {
    //check for blank field
    if(event.target.value==='') {
      if(this.state.confirmPassword==='') {
        this.setState({
          password : event.target.value,
          passwordValid : false,
          confirmPasswordErrorMsg : ''
        },() => this.checkall())
      } else {
          this.setState({
            password : event.target.value,
            passwordValid : false,
            confirmPasswordValid : false,
            confirmPasswordErrorMsg : 'Passwords do not Match!'
          },() => this.checkall())
        }
    } else if(event.target.value===this.state.confirmPassword) {
        this.setState({
          password : event.target.value,
          passwordValid : true,
          confirmPasswordValid : true,
          confirmPasswordErrorMsg : ''
        },() => this.checkall())
    } else {
      this.setState({
        password : event.target.value,
        passwordValid : true,
        confirmPasswordValid : false,
        confirmPasswordErrorMsg : 'Passwords do not Match!'
      },() => this.checkall())
    }
  }

  handleConfirmPasswordChange = (event) => {
    if(event.target.value===this.state.password) {
        this.setState({
          confirmPassword: event.target.value,
          confirmPasswordValid: true,
          confirmPasswordErrorMsg: ''
        },() => this.checkall())
      } else {
      this.setState({
        confirmPassword: event.target.value,
        confirmPasswordValid: false,
        confirmPasswordErrorMsg: 'Passwords do not Match!'
      },() => this.checkall())
    }
  }

  //to check validity of all fields
  checkall() {
    if(this.state.userName && this.state.accountTypeValid && this.state.emailValid && this.state.addressValid && this.state.passwordValid && this.state.confirmPasswordValid) {
      this.setState({
        isButtonDisable : false
      })
    } else {
      this.setState({
        isButtonDisable : true
      })
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      userName : this.state.userName,
      accountType : this.state.accountType,
      email : this.state.email,
      address : this.state.address,
      password : this.state.password
    }
    axios.post(`http://www.mocky.io/v2/5d4040a03300003e239d2afe`,{user})
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err)
      })
    console.log(event);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User Name </label>
            <input type='text' value={this.state.userName} onChange={this.handleUsernameChange}/>
          </div><br/>
          <div>
            <label>Account Type </label>
            <select name="accountType" value={this.state.accountType} onChange={this.handleAccountTypeChange}>
              <option value="" disabled>Select</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div><br/>
          <div>
            <label>Address </label>
            <input type='text' value={this.state.address} onChange={this.handleAddressChange}/>
          </div><br/>
          <div>
            <label>Email ID </label>
            <input type='text' value={this.state.email} onChange={this.handleEmailChange}/>
            {this.state.emailErrorMsg!=='' && <div style={{fontSize:'70%'}}>{this.state.emailErrorMsg}</div>}
          </div><br/>
          <div>
            <label>Password </label>
            <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
          </div><br/>
          <div>
            <label>Confirm Password </label>
            <input type='password' value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}/>
            {this.state.confirmPasswordErrorMsg!=='' && <div style={{fontSize:'70%'}}>{this.state.confirmPasswordErrorMsg}</div>}
          </div><br/>
          <button type="submit" disabled = {this.state.isButtonDisable}>Register</button><br/>
        </form><br/>
        <div>
          Already have an account!! <br/><br/>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </div>
    )
  }
}

export default Register
