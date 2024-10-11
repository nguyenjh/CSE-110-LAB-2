import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from './constants';
import ToggleTheme, { ClickCounter } from './hookExercise';
import heartEmpty from './images/heart_empty.png';
import heartFull from './images/heart_full.png';
import { ThemeContext, themes } from "./ThemeContext";
import heartWhite from './images/white heart.png';

const initList: Note[] = [];
function App() {
    const [currTheme, setCurrTheme] = useState(useContext(ThemeContext));
    const toggleTheme = () => {
      setCurrTheme(currTheme === themes.light ? themes.dark : themes.light);
    };

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

        setCreateNote({
            ...createNote,
            id: notes.length + 1,
        })
        console.log(createNote)
        setNotes(() => {
            return [...notes, createNote];
        })
        console.log(notes)
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
    
    // Delete Notes
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
        // <ThemeContext.Provider value={currentTheme}>
        <div className='app-container' style={{
          background: currTheme === themes.light ? themes.light.background : "#333333",
          color: currTheme.foreground
          }}>
            <form className="note-form" onSubmit={createNoteHandler} action='#'>
                <div>
                    <input
                        placeholder="Note Title"
                        onChange={(event) =>
                        setCreateNote({ ...createNote, title: event.target.value })}
                        required 
                        style={{
                          background: currTheme.background,
                          color: currTheme.foreground,
                          border: currTheme === themes.light ? "1px solid #000000" : "1px solid #ccc"
                        }}>
                    </input>
                </div>
                <div>
                    <textarea
                        onChange={(event) =>
                            setCreateNote({ ...createNote, content: event.target.value })}
                        required 
                        style={{
                          background: currTheme.background,
                          color: currTheme.foreground,
                          border: currTheme === themes.light ? "1px solid #000000" : "1px solid #ccc"
                        }}
                        placeholder="Note Content">
                    </textarea>
                </div>
                <div>
                    <select
                        onChange={(event) =>
                            setCreateNote({ ...createNote, label: event.target.value as Label })}
                        required
                        style={{
                          background: currTheme.background,
                          color: currTheme.foreground
                        }}>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>
                <button type="submit"
                style={{
                  color: currTheme.background
                }}>Create Note</button>
                <button onClick={toggleTheme}
                style={{
                  color: currTheme.background
                }}>Toggle Theme</button>
            </form>
            <div className="notes-grid">
                {notes.map((note) => (
                <div
                    key={note.id}
                    className="note-item"
                    style={{
                      background: currTheme.background,
                      color: currTheme.foreground
                    }}
                >
                    <div className="notes-header">
                        <img
                            onClick={() => toggleFavorite(note)}
                            // style={{ width: 20 }}
                            style={{
                              width: 20,
                            }}
                            src={note.favorite ? heartFull  : (currTheme === themes.dark ? heartWhite : heartEmpty)} 
                        >
                        </img>
                        <button
                            onClick={() => handleDelete(note)}
                            style={{
                              background: currTheme.background,
                              color: currTheme.foreground
                            }}
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
                        }}
                        style={{
                          background: currTheme.background,
                          color: currTheme.foreground
                        }}>
                        <option value={note.label} >{note.label}</option>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>
                ))}
            </div>
            <div className="favoriteContainer">
              <h2>List of Favorites:</h2>
              <div className="favorited-notes">
                  {favoriteList.map((note) => {
                      return (
                          <li key={note.id}>{note.title}</li>
                      );
                  })}
              </div>
            </div>
            
	    </div>
      // </ThemeContext.Provider>
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