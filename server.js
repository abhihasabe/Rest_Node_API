const expess= require("express");
const mysql= require("mysql");
const app =expess();
const port = process.env.port || 3000;
const bodyparser = require('body-parser');
var readline= require("readline");

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bakery_managment'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connetion succeded');
    else
    console.log('DB connection failed'+JSON.stringify(err,undefined,2));
})

app.get("/posts",(req,res) =>{
    // res.send({name :"Abhijeet"})
    mysqlConnection.query('SELECT flr_name, flv_img FROM flavour WHERE flr_status = 1', (err, rows, fields)=>{
        if(!err)
        res.send(rows)
        //console.log(rows[0]);
        else
        console.log(err);
    })
})

/* ---------------------------------------get Data-------------------------------------------------- */
app.get("/posts/:id",(req,res) =>{
    // res.send({name :"Abhijeet"})
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send(rows)
        //console.log(rows[0]);
        else
        console.log(err);
    })
})


/**================================================Insert Data========================================= */

app.post("/submit",(req,res) =>{
    
    var sql="insert into employee values(null,'Abhishek','emp4','40000')";
    mysqlConnection.query(sql, (err, rows, fields)=>{
        if(!err)
        res.send("insert data")
        else
        console.log(err);
    })
})


/**==============================================delete Data=========================================== */
app.delete("/delete/:id",(req,res) =>{
    // res.send({name :"Abhijeet"})
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send("Delete Successfully")
        //console.log("Delete Successfully");
        else
        console.log(err);
    })
})

app.listen(port,function(){
    console.log('Server is running {port}');
})