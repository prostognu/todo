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
const sqlite3 = require('sqlite3').verbose()
const dbname = path.join(__dirname, 'database', 'todo.db')

const db = new sqlite3.Database(dbname, err => {
  if (err) {
    return console.error(err.message)
  }
  console.log("Successful connection to the database 'todo.db'")

  const sql_create_books_table = `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    comments TEXT
  );`
  db.run(sql_create_books_table, err => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Successful creation of the 'books' table")
  })

  const sql_insert_into_books = `INSERT INTO books (id, title, author, comments) VALUES
    (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
    (2, 'Mr. Bridge', 'Evan S. Connell', 'First in the serie'),
    (3, 'L''ingenue libertine', 'Colette', 'Minne + Les egarements de Minne')
  ;`
  db.run(sql_insert_into_books, err => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Successful creation of 3 books")
  })
})

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
app.get('/books', (req, res) => {

  const sql = 'SELECT * FROM books ORDER BY title'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.render('books', {
      title: 'Книги',
      books: rows,
    })
  })

})

app.listen(3000, () => {
  console.log(`Server started at http://localhost:${port}`)
  console.log('Press Ctrl+C to exit')
})
