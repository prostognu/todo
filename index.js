// Usefull links:
// https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/

const port = 3000
const express = require('express')
const app = express()
const path = require('path')
const sqlite = require('sqlite3').verbose()

// template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// database


// routes
app.use(express.static(path.join(__dirname, 'public'))) // static files

app.get('/', (req, res) => {
  res.render('index', {
    title: 'ProstoGNU ToDo List',
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'О проекте',
  })
})
app.get('/data', (req, res) => {
  res.render('data', {
    title: 'Данные',
    items: ['one', 'two', 'three'],
  })
})

app.listen(3000, () => {
  console.log(`Server started at http://localhost:${port}`)
  console.log('Press Ctrl+C to exit')
})
