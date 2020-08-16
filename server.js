const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const items=require('./routes/api/items');
const users=require('./routes/api/Users');
const auth=require('./routes/api/auth');

const config=require('config');
//body parser
app.use(express.json());
//Mongo URI
const db=config.get('mongoURI');
//Connect ro MongoDB
mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true
})
        .then(()=>{console.log('mongoDB connected')})
        .catch((err)=>{console.log(err)});
//routes
app.use('/api/items',items);
app.use('/api/Users',users);
app.use('/api/auth',auth);


//if prod
if(process.env.NODE_ENV==='production'){
app.use(express.static('client/build'));
app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})

}
const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`Server started on port ${port}`)});
