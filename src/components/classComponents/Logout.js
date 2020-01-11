import React from 'react'

function Logout(props) {

    function handleSubmit() {
        props.logout();
    }

    return (
        <button type='submit' onClick={handleSubmit}>Sign Out</button>
    )
}

export default Logout
