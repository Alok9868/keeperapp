import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Avatar } from "@material-ui/core";
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";
function Header(props) {
  let history = useHistory();
  function logout(event) {
    cookie.remove("userid",{path:"/"});
    cookie.remove("displayName",{path:"/"});
    cookie.remove('photoURL',{path:"/"});
    event.preventDefault();
    history.push('/');
   }
  return (
    <header>
      <div className="my-flex">
        <div className="icon-keeper-flex">
          <HighlightIcon className="light-icon" />
          <h1>Keeper</h1>
        </div>

        <div>
          <h2 className="white-welcome">Welcome</h2>
          <h2>{props.name}</h2>
        </div>


        <div className="profile-section">
          <Avatar className="avatar"
            src={props.src}
          />
          <button onClick={logout} className="log-out" >
            Log out
          </button>
        </div>
      </div>

    </header>
  );
}

export default Header;
