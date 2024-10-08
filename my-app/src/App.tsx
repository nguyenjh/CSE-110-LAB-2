import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";          // Import the Label type from the appropriate module
import { dummyNotesList } from './constants';   // Import the dummyNotesList from the appropriate module
import ToggleTheme, { ClickCounter } from './hookExercise';
// import { Favorite } from './hooks';

const initList: Note[] = [];

function App() {

    // Create new Note
    const [notes, setNotes] = useState(dummyNotesList); 
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        favorite: false,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    
    const createNoteHandler = () => {
        console.log("in creatNoteHandler")
        
        setCreateNote({...createNote, id: notes.length + 1})
        console.log(createNote)
        setNotes(() => {
            return [...notes, createNote];
        })
    }

    // Update Notes
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    const handleEdit = (note: Note, field: string, value: string) => {
        setSelectedNote(note)

        console.log("in handleEdit")
        if (field === "title") {
            setSelectedNote({...selectedNote, title: value});
        }
        if (field === "content") {
            setSelectedNote({...selectedNote, content: value});
        }
        if (field === "label") {
            setSelectedNote({...selectedNote, label: value as Label})
        }
    }

    
    // Delet Notes
    const handleDelete = (note: Note) => {
        setNotes(() => {
            return notes.filter((id) => id !== note);
        })
        setFavoriteList((favoriteList) => {
            return favoriteList.filter((id) => id !== note);
        });
    }

    // Favorite Notes
    const [favoriteList, setFavoriteList] = useState(initList);

    const toggleFavorite = (note: Note) => {
        console.log("in toggleFavorite")
        
        note.favorite = !note.favorite
        setFavoriteList((favoriteList) => {
            if (favoriteList.includes(note)) {
                return favoriteList.filter((id) => id !== note);
            } else {
                return [...favoriteList, note];
            }
        });
    };

    return (
        <div className='app-container'>
            <form className="note-form" onSubmit={createNoteHandler} action='#'>
                <div>
                    <input
                        placeholder="Note Title"
                        onChange={(event) =>
                            setCreateNote({ ...createNote, title: event.target.value })}
                        required>
                    </input>
                </div>

                <div>
                    <textarea
                        onChange={(event) =>
                            setCreateNote({ ...createNote, content: event.target.value })}
                        required>
                    </textarea>
                </div>

                <div>
                    <select
                        onChange={(event) =>
                            setCreateNote({ ...createNote, label: event.target.value as Label })}
                        required>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>

                <div><button type="submit">Create Note</button></div>
            </form>

            <div className="notes-grid">
                {notes.map((note) => (
                <div
                    key={note.id}
                    className="note-item"
                >
                    <div className="notes-header">
                        <button
                            onClick={() => toggleFavorite(note)}
                            style={{ color: note.favorite ? 'red' : 'gray' }} 
                        >
                            Favorite
                        </button>
                        <button
                            onClick={() => handleDelete(note)}
                        >x</button>
                    </div>
                    <h2 contentEditable="true" onInput={(e) => {
                        handleEdit(note, "title", e.currentTarget.innerHTML)
                        console.log("title edited");
                    }}> {note.title} </h2>
                    <p contentEditable="true" onInput={(e) => {
                        handleEdit(note, "content", e.currentTarget.innerHTML)
                        console.log("content");
                    }}> {note.content} </p>
                    {/* <p contentEditable="true" onInput={(e) => {
                        handleEdit(note, "label", e.currentTarget.innerHTML)
                        console.log("title edited");
                    }}> {note.label} </p> */}
                    <select
                        onChange={(e) => {
                            handleEdit(note, "label", e.target.value as Label)
                            console.log("label edited");
                        }}>
                        <option value={note.label}>{note.label}</option>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>
                ))}
            </div>
            <div className="favorited-notes">
                {favoriteList.map((note) => {
                    return (
                        <li key={note.id}>{note.title}</li>
                    );
                })}
            </div>
	    </div>
        // <div className='app-container'>
        //     <form className="note-form">
        //         <div><input placeholder="Note Title"></input></div>
        //         <div><textarea></textarea></div>
        //         <div><button type="submit">Create Note</button></div>
        //     </form>
        //     <div className="notes-grid">
        //         {dummyNotesList.map((note) => (
        //             <div
        //             key={note.id}
        //             className="note-item">
        //             <div className="notes-header">
        //             <button
        //                 onClick={() => toggleFavorite(note)}
        //                 style={{ color: note.favorite ? 'red' : 'gray' }} 
        //             >
        //                 Favorite
        //             </button>
        //                 <button>x</button>
        //             </div>
        //             <h2> {note.title} </h2>
        //             <p> {note.content} </p>
        //             <p> {note.label} </p>
        //             </div>
        //         ))}
        //     </div>
    );
}

export default App;
