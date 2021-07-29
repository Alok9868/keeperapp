import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import EditIcon from '@material-ui/icons/Edit';
import cookie from 'react-cookies';
import db from "./firebase";
function MyVerticallyCenteredModal(props) {
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });
  const userid=cookie.load("userid");
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
    .where('userid','==',userid)
    .onSnapshot((snapshot)=>{
      snapshot.docs.map((doc)=>{
        db.collection('users')
        .doc(doc.id)
        .collection('Notes')
        .doc(props.id)
        .update({
          title:note.title,
          content:note.content
        })
      });
    })
    event.preventDefault();
    props.onHide();
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
          />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" variant="primary" onClick={ submitNote }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
function Note(props) {
  const [modalShow, setModalShow] = React.useState(false);
  function active() {
    setModalShow(true);
  }
  function deactive(){
    setModalShow(false);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{props.deletenote(props.id)}}>
      <DeleteIcon />
      </button>
      <Button className="btn btn-secondary" variant="primary" onClick={active}>
      <EditIcon />
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={deactive}
          title={props.title}
          content={props.content}
          id={props.id}
        />
    </div>
  );
}

export default Note;
