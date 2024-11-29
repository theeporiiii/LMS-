const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://abhi02167:Abhi@cluster1.65dle.mongodb.net/login?retryWrites=true&w=majority&appName=cluster1")
.then(()=>{
  console.log("Db connected")
})
.catch((error)=>{
    console.log(error)
})