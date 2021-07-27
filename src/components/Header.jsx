import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Avatar } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { auth } from "./firebase";
function Header(props) {
  function logout(event)
  {
    event.preventDefault();
    auth.signOut().then(()=>{
      console.log("logged out");
    })
  }
  return (
    <header>
        <HighlightIcon />
        <Avatar className="avatar"
          src={props.src}
        />
        <h2>{props.name}</h2>
        <h1>Keeper</h1>
        <button onClick={logout} >
        Log out 
      </button>
    </header>
  );
}

export default Header;
