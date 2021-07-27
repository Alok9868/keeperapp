import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Notescollection from "./Notescollection";

function App() {
  const [{user},dispatch]=useStateValue();
  const [notes,setNotes]=useState([]);
  {
    return !user? (<Login />) :  (

      <div>
        <Header 
         src={user?.photoURL } 
         name={user.displayName} />
        <CreateArea  />
        <Notescollection />
        <Footer />
      </div>
    );
  }
  // return (

  //   <div>
  //     <Header />
  //     <CreateArea onAdd={addNote} />
  //     {notes.map((noteItem, index) => {
  //       return (
  //         <Note
  //           key={noteItem.id}
  //           id={noteItem.id}
  //           title={noteItem.title}
  //           content={noteItem.content}
  //           onDelete={deleteNote}
  //         />
  //       );
  //     })}
  //     <Footer />
  //   </div>
  // );
}

export default App;
