const router = require('express').Router();
const express = require('express');

const app = express();

const { readAndAppend, readFromFile } = require('../utils/fsUtils')

//variables from public/js/index.js
if (window.location.pathname === '/notes') {
    noteForm = document.querySelector('.note-form');
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    clearBtn = document.querySelector('.clear-btn');
    noteList = document.querySelectorAll('.list-container .list-group');
  }
//html routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

app.use(express.static('public'));

app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname,'./public/index.html'))
);
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname,'./public/notes.html'))
);



//api routes
  
router.get('/api/notes', (req,res) => {
    readFromFile('./db/db.json').then((data) => 
        res.json(JSON.parse(data))
    );
});

router.post('/api/notes', (req,res) => {

    const note = {
        title: noteTitle.value,
        text: noteText.value 
    }
    
    readAndAppend(note, './db/db.json');
    res.json(`new note added`);
})

module.exports = router;
