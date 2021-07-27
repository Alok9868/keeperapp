import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function CreateArea() {
  const [isExpanded, setExpanded] = useState(false);
  const [{user},dispatch]=useStateValue();

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    db.collection("users")
    .where('userid','==',user.uid)
    .onSnapshot((snapshot)=>{
      snapshot.docs.map((doc)=>{
        db.collection('users')
        .doc(doc.id)
        .collection('Notes')
        .add({
          title:note.title,
          content:note.content
        });
      });
    });
    setNote({
      title: "",
    content: ""

    })
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
