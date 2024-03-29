const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const mysql = require("mysql2")
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root", 
    password:"0399518901",
    database:"crud_contact"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/api/get",(rep,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(error , result)=>{
        res.send(result)
    })
})

app.post("/api/post",(rep,res) => {
    const {name,email,contact} = rep.body
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?) "
    db.query(sqlInsert,[name,email,contact], (error,result) => {
        if(error){
            console.log(error)
        }
    })
})
app.delete(`/api/remove/:id`,(rep,res) => {
    const {id} = rep.params
    const sqlRemove = "DELETE FROM contact_db WHERE id = ? "
    db.query(sqlRemove,id , (error,result) => {
        if(error){
            console.log(error)
            res.status(500).send("Internal Server Error");
        }else{
            res.send("Contact deleted successfully");
        }
    })
})

app.get("/api/get/:id",(rep,res)=>{
    const {id} = rep.params
    const sqlGet = "SELECT * FROM contact_db WHERE id = ? ";
    db.query(sqlGet, id , (error , result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.put("/api/update/:id",(rep,res)=>{
    const {id} = rep.params
    const {name,email,contact} = rep.body
    const sqlUpdate = "UPDATE contact_db SET name=? , email=?,contact=? WHERE id = ? ";
    db.query(sqlUpdate, [name,email,contact,id] , (error , result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.get("/",(rep,res) => {
    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES('si2','sitran@gmail.com',0303030303)";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error)
    //     console.log("result",result)
    //     res.send("hellp express")
    // })
})

app.listen(5000,() => {
    console.log("server is running on port 5000")
})
