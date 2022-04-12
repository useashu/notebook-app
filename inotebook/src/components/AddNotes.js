import React, { useState,useContext } from 'react'
import NoteContext from "../context/notes/NoteContext";


function AddNotes() {
     const context=useContext(NoteContext);
     const {addNote}=context;

    const [data, setData] = useState({ title: "", description: "",tag:"" });

    const handleChange=(event)=> {
        const { name, value } = event.target;
        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        })
    }
    const handleClick = (event) => {
      addNote(data.title,data.description,data.tag);
      setData({title:"",description:"",tag:""})
      event.preventDefault();
    }
    return (
        <>
            <div className='container'>
                <h2>Add Note</h2>
            </div>
            <div className='container my-3'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={data.title} aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desciption" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={data.description} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={data.tag} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>

    )
}

export default AddNotes
