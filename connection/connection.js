const mongoose=require('mongoose');
mongoose.set('strictQuery',false);


const connectDB=(uri)=>{
    uri="mongodb+srv://anurodhk82:I3YqlaEreWKx7MkU@myapi.thet0hs.mongodb.net/Restraunt?retryWrites=true&w=majority";
    console.log("connected");
    return mongoose.connect(uri,{
        // useNewUrlPareser: true , 
        useUnifiedTopology: true,
    })
};
module.exports=connectDB;


