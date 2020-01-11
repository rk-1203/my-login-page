import React,{useState} from 'react'

function LoginView() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');


    return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <label>Email ID </label>
                <input type='text' value={} onChange={this.handleEmailChange}/>
                {this.state.emailErrorMsg!=='' && <div style={{fontSize:'70%'}}>{this.state.emailErrorMsg}</div>}
            </div><br/>
            <div>
                <label>Password </label>
                <input type='password' value={} onChange={this.handlePasswordChange}/>
            </div><br/>
            <button type="submit" disabled = {}>Login</button><br/>
        </form>
    )
}

export default LoginView
