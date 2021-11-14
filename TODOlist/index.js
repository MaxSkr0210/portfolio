const express = require('express');
const path = require('path');
const { v4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3000

let todos = []

app.use(express.static(path.resolve(__dirname, 'client')));

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.get('/api/todos', (req, res) => {
    res.send(todos)
})

app.post('/api/todos', (req, res) => {
    const todo = {...req.body, id: v4(), marked: false };
    todos.push(todo)
    res.status(200).json(todo)
})

app.delete('/api/todos/:id', (req, res) => {
    todos = todos.filter(el => el.id !== req.params.id);
    res.status(200).json({ m: 'delete comleted' })
})

app.put('/api/todos/:id', (req, res) => {
    const idx = todos.findIndex(el => el.id === req.params.id);
    todos[idx] = req.body;
    res.json(todos[idx])
})

app.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:3000/`);
})