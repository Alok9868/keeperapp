import React from 'react'
import HighlightIcon from '@material-ui/icons/Highlight';
import  { auth, provider } from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {
    const [{},dispath]=useStateValue();
    function signin()
    {
        auth
        .signInWithPopup(provider)
        .then((result)=>{
            console.log(result);
            dispath({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch((error)=>alert(error.message));
    }
    return (  
        <div>
            <h1>First Login</h1>
            <HighlightIcon />
            <button onClick={signin}>Click to login</button>
        </div>
    )
}

export default Login
