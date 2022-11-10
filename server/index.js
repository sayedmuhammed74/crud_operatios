const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const port = 8080

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    db:'crud_contact'
})

connection.connect()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// get all
app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM crud_contact.contacts"
    connection.query(sqlGet, (err, result) => {
        if (err) throw err
        res.send(result)
    })
    
})


// insert
app.post('/api/post', (req, res) => {
    const {name, email, contact} = req.body
    const sqlInsert = `INSERT INTO crud_contact.contacts VALUES (null, '${name}' , '${email}', '${contact}')` 
    connection.query(sqlInsert, [name, email, contact] ,(err, result) =>{
        if (err) throw err
        console.log('Inserted')
    })
})

// delete
app.delete(`/api/delete/:userId`, (req, res) => {
    const sqlDelete = `DELETE FROM crud_contact.contacts where id = ${req.params.userId}`
    connection.query(sqlDelete, (err, result) => {
        if (err) console.log(err)
        console.log('Deleted')
    })
})

// get by id
app.get('/api/get/:userId', (req, res) => {
    const {userId} = req.params
    const sqlGet = `SELECT * FROM crud_contact.contacts WHERE id = ${userId}`
    connection.query(sqlGet, userId ,(err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

// update
app.put('/api/update/:userId', (req, res) => {
    const {userId} = req.params
    const {name , email , contact} = req.body
    const sqlUpdate = `UPDATE crud_contact.contacts SET name = '${name}', email = '${email}', contact = '${contact}' WHERE id = ${userId}`
    connection.query(sqlUpdate, [name, email, contact, userId] ,(err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})


// view
// app.get('/api/get/:userId', (req, res) => {
//     const {userId} = req.params
//     const sqlView = `SELECT * FROM crud_contact.contacts WHERE id = ${userId}`
//     connection.query(sqlView , userId ,(err , result) => {
//         if(err){
//             console.log(err)
//         }
//         console.log('Viewed')
//         res.send(result)
//     })
// })
app.listen(port, () => console.log(`Localhost on port ${port}`))