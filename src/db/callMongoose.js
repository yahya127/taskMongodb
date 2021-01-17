const mongoose= require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/g3Api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
module.exports=callMongoose