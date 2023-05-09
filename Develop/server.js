const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use (express.static('public'));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);


app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);


// getting request from notes page
app.get('/notes', (req, res) =>{
// send confirm to client
res.status(200).json(`${req.method} request received to get notes`);
// log to term
console.info(`${req.method} request received to get notes`);
});


//POST
app.post('/notes', (req, res) =>{
// msg post was received
console.info(`${req.method} request received to add notes`);

//deconstructing req.body
const { title, text} = req.body;

if ( title && text){
    const newNote = {
        title,
        text,
    };

const notesString = JSON.stringify(newNote);

// draws from starter db
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if (err){
            console.log(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
//add to db
    fs.writeFile( './db/db.json',
    JSON.stringify(parsedNotes, null),
    err => err ? console.log(err) : console.log('note added'));
        }
    });

fs.appendFile( './db/db.json',
notesString , (err) => err ? console.log(err) : console.log('note added and written to file.')
);

const response = {
    status: 'success',
    body: newNote,
};
console.log(response);
res.status(201).json(response);
}else {
    res.status(500).json('ERROR in posting.');
}

}

);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

