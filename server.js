const express = require('express')
const morgan = require('morgan')
const server = express()

const PORT = 4000

server.use(morgan('dev'))


// middleware
server.use(express.urlencoded({ extended: true }));


const secretKey = 'kats123'


server.get('/', (req, res)=>{
    res.sendFile('./public/index.html', {root: __dirname})
})

server.get('/login', (req, res)=>{
    res.sendFile('./public/login.html', {root: __dirname})
})

server.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === secretKey) {
        res.redirect('/course');
    } else {
        res.redirect('/back')
    }
});

server.get('/back', (req, res)=>{
    res.sendFile('./public/back.html', {root: __dirname})
})

server.get('/course', (req,res)=>{
    res.sendFile('./public/course.html', {root: __dirname})
})

server.use((req, res)=>{
    res.sendFile('./public/404.html', {root: __dirname})
})

server.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})
