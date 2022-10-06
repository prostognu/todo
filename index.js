const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res
    .status(200)
    .send('ProstGNU ToDo List')
    .end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log('Press Ctrl+C to exit.')
})
