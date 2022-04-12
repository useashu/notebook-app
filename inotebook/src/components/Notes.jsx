import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom'
import AddNotes from './AddNotes'


function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const history = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history("/");
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  }

  const onChange = (event) => {
    setNote(prevNote => {
      return { ...prevNote, [event.target.name]: event.target.value }
    })
  };
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setNote({ etitle: "", edescription: "", etag: "" })
    refClose.current.click();
  }


  return (
    <>
      {localStorage.getItem('token')&&<h1 style={{marginTop:"30px"}} className="text-center">Welcome {localStorage.getItem('username')}</h1>}
      <AddNotes />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container my-3'>
        <h2>Your Notes</h2>
        <div className='row my-3'>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                note_id={note._id}
                showalert={props.showalert}
                note={note}
                updatenote={updateNote}
              />);
          })}
        </div>
      </div>
    </>

  )
}

export default Notes
