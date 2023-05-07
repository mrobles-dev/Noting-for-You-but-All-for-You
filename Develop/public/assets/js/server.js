const express = require('express');
const path = ('path');
const fs = ('require');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use (express.static('index'));

app.get('/', (req, res)=>
res.sendFile(path.join(__dirname,'/public/index.html'))
);

//getting request from notes page
app.get('/notes', (req, res) =>{
// send confirm to client
res.json(`${req.method} request received to get notes`);
//log to term
console.info(`${req.method} request received to get notes`);
});

//POST
app.post('/index')