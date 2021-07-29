import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import Note from "./Note";
import cookie from 'react-cookies';
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
function Notecollections() {
  const [{user}]=useStateValue();
  const [notes,setNotes]=useState([]);
  const userid=cookie.load("userid");
  const photoURL=cookie.load("photoURL");
  const displayName=cookie.load("displayName");
  useEffect(() => {
   const unsubscribe= db.collection("users")
    .where('userid','==',userid)
    .onSnapshot((snapshot)=>{
      if(snapshot.empty)
      {
        db.collection('users')
            .add({
              name:user.displayName,
              userid:user.uid
            })
            .then((ref)=>{
              console.log(ref);
              console.log("user is added");
            })
            .catch(error=>{console.log(error);})
      }
      snapshot.docs.map((doc)=>{
        db.collection('users')
        .doc(doc.id)
        .collection('Notes')
        .onSnapshot((snapshot)=>
        {
          const newnotes=snapshot.docs.map((doc)=>{
              // console.log(doc.data());
              const data=doc.data();
              data['id']=doc.id;
            return data;
          })
          setNotes(newnotes);
        })
      })
    },(error)=>{
        console.log("user not found",error);
    })
      return () => {
          unsubscribe();
      }
  }, [userid]);
  
  function deletenote(id) {
    db.collection("users")
    .where('userid','==',userid)
    .onSnapshot((snapshot)=>{
      snapshot.docs.map((doc)=>{
        db.collection('users')
        .doc(doc.id)
        .collection('Notes')
        .doc(id)
        .delete()
        .then(()=>{
                console.log("deleted successfully");
        }) 
        .catch((error)=>{
            console.log("error",error);
        })
        
    })
    })
  }
  
  return ( <div>
      <Header 
         src={photoURL } 
         name={displayName} />
        <CreateArea  />
        <div className="note-2">
        {notes.map( note=>  
         <Note 
            title={note.title}
            content={note.content}
            id={note.id}
            key={note.id}
            deletenote={deletenote}
         /> )}
        <Footer />
      </div>
    </div>
  );
}

export default Notecollections;
