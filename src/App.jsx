import { useState, useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')
  const[editingIndex, setEditingIndex] = useState(null)
  const isLoaded = useRef(false)
  const [search, setSearch] = useState('')

useEffect(() => {
  const savedNotes = localStorage.getItem('notes')

  if (savedNotes) {
    setNotes(JSON.parse(savedNotes))
  }
  setTimeout(() => {
    isLoaded.current = true
  }, 0)
}, [])

useEffect(() => {
  if (isLoaded.current) {
    localStorage.setItem('notes', JSON.stringify(notes))
  }
}, [notes])
 
const filteredNotes = notes
  .map((note, index) => ({ note, index }))
  .filter(({ note }) =>
    
note.toLowerCase().includes(search.toLowerCase()))
  

  return (
    <div>
      <h1>My Notes</h1>
      

      <input
        type="text"
        placeholder="Write a note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}

      />
      <input
        type="text"
        placeholder="search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}

      />



      <button className="add-button"
       onClick={() => {
          if (input.trim() === '') return

            if(editingIndex !== null) {
              const updatedNotes = [...notes]
              updatedNotes[editingIndex] = input
              setNotes(updatedNotes)
              setEditingIndex(null)
            } else {
              setNotes([...notes, input])
            }
            setInput('')
          }}>
            {editingIndex !== null? 'Save changes' : 'Add Note'}

      
        
      </button>
      <ul>
  {filteredNotes.map(({ note, index }) => (
    <li key={index}>
      {note}

      <button
        className="edit-button"
        onClick={() => {
          setEditingIndex(index)
          setInput(note)
        }}
      >
        Edit
      </button>

      <button
        className="delete-button"
        onClick={() => {
          setNotes(notes.filter((_, i) => i !== index))
        }}
      >
        Delete
      </button>

      {editingIndex === index && (
        <button
          className="cancel-button"
          onClick={() => {
            setEditingIndex(null)
            setInput('')
          }}
        >
          Cancel
        </button>
      )}
    </li>
  ))}
</ul>
    </div>
  )
}

export default App