// Student Name: SAI KISHORE REDDY KONATHAM
// Student ID: 1226951585
// Date: 09/24/2023

const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const { makeUpperCase, checkAdmin} = require('./middleware/index');
const {getSpecificStudent, getStudents, addStudents, updateStudent, deleteStudent} = require('./controllers/student');
app.use(bodyparser.json())
app.use(makeUpperCase)

app.get('/students/:id', checkAdmin, getSpecificStudent) // get all student function
app.get('/students', getStudents)
app.post('/students', addStudents)

app.put('/students/:id', updateStudent)
app.delete('/students/:id', checkAdmin, deleteStudent)

app.use('/', function (req, res, next) {
  console.log('Request URL:', +req.url)
  res.send('Hello')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
