const fs = require('fs')
const yargs = require('yargs')
const express=require('express')
//require('./db/callMongoose')
require('./models/users')
const app=express()
//const User= require('User')
const {MongoClient , ObjectID}= require('mongodb')
const connectionURL='mongodb://127.0.0.1:27017'
const dbUser='g3'
const port=process.env.PORT|| 3000
app.use(express.json())
readFileData = function(){
    try{
        data = fs.readFileSync('tasks.json')
        if(data.toString().length==0) throw new Error('errrr')
        data = JSON.parse(data.toString())
        if(!Array.isArray(data)) throw new Error('')
    }
    catch(e){
        data = []
        fs.writeFileSync('tasks.json', "[]")
    }
    return data    
}
addCustomer = function(note) {
    data = readFileData() //=> return array
    data.push(note)
    fs.writeFileSync('tasks.json', JSON.stringify(data))
}
MongoClient.connect(connectionURL,{useNewParse:true},(err,client)=>{
    if(err) return console.log('db error')
    yargs.command({
        command: "addCust",
        describe: "add new customer to our file",
        builder: {
            name: { type: 'string', demandOption: true },
            balance: { type: 'number', demandOption: true },
            accountNumber:{type:'number', demandOption:true}  
        },
        handler: function (argv) {
            data = readFileData()
            accountNumbers = []
            data.forEach(element => {
                accountNumbers.push(element.accountNumber)
            });
            existNum=accountNumbers.includes(argv.accountNumber)
            
            if(!existNum) {
                let customer = { name: argv.name, balance: argv.balance, accountNumber: argv.accountNumber }
                console.log(customer);
                addCustomer(customer) 
            }
            else{        
                console.log("this Number is exist before") 
            }
        }
    })
    yargs.argv
    const db = client.db(dbUser)
    console.log('db connected')
    db.collection('User').insertMany(
        [{ name: argv.name, balance: argv.balance, accountNumber: argv.accountNumber }]
      )
    })  

app.listen(port)