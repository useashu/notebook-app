import React, { useState } from 'react'
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([]);
    
    const getNotes=async()=>{
       const response=await fetch(`${host}/api/notes/fetchallnotes`,{
           method:'GET',
           headers:{
            'Content-Type':'application/json',
            "auth-token":  localStorage.getItem('token')
           }
       });
       const json=await response.json();
       setNotes(json);
    }

    const addNote =async(title, description, tag) => {
        const response=await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":  localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const newNote=await response.json();
        setNotes(notes.concat(newNote));
        
    }

    const deleteNote=async(id)=> {
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                 "auth-token":  localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        const newNote=notes.filter((note)=>{
            return note._id!==id
        })
        setNotes(newNote);
      };

    const editNote=async(id,title,description,tag)=>{
         const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
             "auth-token":  localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
        });
    //    const json = await response.json();
      
       let newNotes = JSON.parse(JSON.stringify(notes))
       // Logic to edit in client
       for (let index = 0; index < newNotes.length; index++) {
         const element = newNotes[index];
         if (element._id === id) {
           newNotes[index].title = title;
           newNotes[index].description = description;
           newNotes[index].tag = tag; 
           break; 
         }
       }  
       setNotes(newNotes);
    
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote,deleteNote ,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;