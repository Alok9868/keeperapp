import React from 'react'
import  { auth, provider } from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import cookie from 'react-cookies';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
function Login() {
    const [{user},dispatch]=useStateValue();
    function signin()
    {
        auth
        .signInWithPopup(provider)
        .then((result)=>{
            console.log(result);
            var  token=result.user.uid;
            var name=result.user.displayName;
            var photoURL=result.user.photoURL;
            cookie.save("userid",token,{path:'/'});
            cookie.save('displayName',name,{path :'/'});
            cookie.save('photoURL',photoURL,{path:'/'});
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch((error)=>alert(error.message));
    }
    return cookie.load('userid') ? <Redirect  to="/Notescollection"/>
   :
      <div className="login">
<div className="login_container">
    <img 
    src="https://png.pngtree.com/png-vector/20190214/ourlarge/pngtree-vector-notes-icon-png-image_509622.jpg" 
    alt="Whatsapp "/>
    <div className="login_text">
        <h1>Signin Keeper App</h1>
    </div>
    <Button variant="secondary" onClick={signin}>
        Sign in with Google
    </Button>
</div>
</div>
      
       
}

export default Login


 //  : <div>
    //   <h1>First Login</h1>
    //   <HighlightIcon />
    //   <button onClick={signin}>Click to login</button>
    //   </div>