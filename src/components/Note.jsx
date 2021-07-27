import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
function Note(props) {
 
  function updatenote()
  {
    console.log(props.id);
    console.log(props.title);
    console.log(props.content);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{props.deletenote(props.id)}}>
      <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
