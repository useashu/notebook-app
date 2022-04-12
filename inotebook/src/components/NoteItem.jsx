import React, {useContext } from 'react'
import NoteContext from "../context/notes/NoteContext";
 
function NoteItem(props) {

    const context=useContext(NoteContext);
     const {deleteNote}=context;

    const handleDelete=()=>{
        deleteNote(props.note_id);
        props.showalert("Deleted Successfully","Success");
    }

    const {note,updatenote}=props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text">{props.tag}</p>
                    <i className="far fa-trash-alt mx-2" onClick={handleDelete} style={{cursor:"pointer"}}></i>
                    <i className="far fa-edit mx-2" style={{cursor:"pointer"}} onClick={()=>updatenote(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
