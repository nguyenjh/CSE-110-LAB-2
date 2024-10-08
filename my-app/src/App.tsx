import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";          // Import the Label type from the appropriate module
import { dummyNotesList } from './constants';   // Import the dummyNotesList from the appropriate module
import ToggleTheme, { ClickCounter } from './hookExercise';
// import { Favorite } from './hooks';

const initList: Note[] = [];

function App() {
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
        setCreateNote({
            ...createNote,
            id: notes.length,
        })
        console.log(createNote)
        setNotes(() => {
            return [...notes, createNote];
        })
        console.log(notes)
    }

    console.log(notes)

    const [favoriteList, setFavoriteList] = useState(initList);

    const toggleFavorite = (note: Note) => {
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
            <form className="note-form" onSubmit={createNoteHandler}>
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
                        <button>x</button>
                    </div>
                    <h2> {note.title} </h2>
                    <p> {note.content} </p>
                    <p> {note.label} </p>
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
