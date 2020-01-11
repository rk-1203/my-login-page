import React, { Component } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import Dashboard from './Dashboard'
import Loader from '../../assets/Loader.gif'
//import {Router, Route, browserHistory, IndexRoute} from "react-router";

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userName : '',
            accountType : '',
            address : '',
            email : '',
            password : '',
            isLoggedIn : false,
            isButtonDisable : true,
            userNameValid : false,
            passwordValid : false,
            emailValid : false,
            showloader : false,
            emailErrorMsg : '',
            loginErrorMsg : ''
        }
    }

    // handleUsernameChange = (event) => {
    //     //console.log(' in listener usernameValid '+this.state.userNameValid+' name '+this.state.userName+' '+this.state.userName.localeCompare(""));
    //     //check for blank field
    //     if(event.target.value===''){
    //         this.setState({
    //             userName : event.target.value,
    //             userNameValid : false
    //         },() => {console.log('usernameValid '+this.state.userNameValid+' name '+this.state.userName+' '+this.state.userName.localeCompare(""));
    //         this.checkall();})
    //     } else {
    //         this.setState({
    //             userName : event.target.value,
    //             userNameValid : true
    //         },() => {console.log('usernameValid '+this.state.userNameValid+' name '+this.state.userName+' '+this.state.userName.localeCompare(""));
    //         this.checkall();})
    //     }
    // }

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
            },() => {this.checkall();})
        } else {
            this.setState({
                email : event.target.value,
                emailValid : false,
                emailErrorMsg : `Enter a valid Email`
            },() => {this.checkall();})
        }
    }

    handlePasswordChange = (event) => {
        //check for blank field
        if(event.target.value==='') {
            this.setState({
                password : event.target.value,
                passwordValid : false
            },() => {this.checkall();})
        } else {
            this.setState({
                password : event.target.value,
                passwordValid : true
            },() => {this.checkall();})
        }
        this.checkall();
    }

    //to check validity of all fields
    checkall() {
        if(this.state.emailValid && this.state.passwordValid) {
            this.setState({
                isButtonDisable : false
            })
        } else {
            this.setState({
                isButtonDisable : true
            })
        }
    }

    //handling Login event
    handleSubmit = (event) => {
        this.setState({
            showloader : true
        })
        setTimeout( () => {
            axios.get(`http://www.mocky.io/v2/5d4040a03300003e239d2afe`)
            .then(response => {
                console.log(response)
                console.log(response.data)
                let i=0;
                for(i=0;i<response.data.length;i++) {
                    if(response.data[i].email===this.state.email && response.data[i].password===this.state.password) {
                        this.setState({
                            isLoggedIn : true,
                            loginErrorMsg : '',
                            userName : response.data[i].userName,
                            address : response.data[i].address,
                            accountType : response.data[i].accountType,
                            showloader : false
                        })
                        break;
                    }
                }
                if(i===response.data.length)
                {
                    this.setState({
                        isLoggedIn : false,
                        loginErrorMsg : 'Wrong Credentials!',
                        showloader : false
                    })
                }
                //this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loginErrorMsg : 'Error Fetching Data...Check Your Internet Connection!!',
                    showloader : false
                })
                //this.setState({errorMsg: 'Error retreiving data'})
            })
        //alert(`Welcome ${this.state.userName}!, Your Account is Registered with Email ID -  ${this.state.email}`)
        }, 1000);
        
        event.preventDefault()
    }

    //hnadling Logout event
    logout = () => {
        //console.log(this);
        this.setState({
            userName : '',
            email : '',
            password : '',
            address : '',
            accountType : '',
            isLoggedIn : false,
            isButtonDisable : true,
            userNameValid : false,
            passwordValid : false,
            emailValid : false,
            showloader : false,
            emailErrorMsg : '',
            loginErrorMsg : ''
        })
    }
    
    render() {
      if(this.state.isLoggedIn) {
        return (
          <Dashboard {...this.state} logout={this.logout}/>
        )
      } else {
        return (
          <React.Fragment>
            {
              (this.state.showloader===false) ? 
              <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label>Email ID </label>
                    <input type='text' value={this.state.email} onChange={this.handleEmailChange}/>
                    {this.state.emailErrorMsg!=='' && <div style={{fontSize:'70%'}}>{this.state.emailErrorMsg}</div>}
                  </div><br/>
                  <div>
                    <label>Password </label>
                    <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                  </div><br/>
                  <button type="submit" disabled = {this.state.isButtonDisable}>Login</button><br/>
                </form>
                <div>{this.state.loginErrorMsg==='' ? null:this.state.loginErrorMsg}</div> <br/>
                <div>
                  Don't Have an account!! <br/><br/>
                  <NavLink to='/register'>Register</NavLink>
                </div>
              </React.Fragment> :
              <div><img src={Loader} alt="Logging you in..."/></div>
            }
          </React.Fragment>
        )
      }
    }
}

export default Login
