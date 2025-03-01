import dotenv from 'dotenv';
import connectMongoDb from './db';
import app from './app';

const port = process.env.PORT || 5000;


dotenv.config({
    path: '../.env'
});

// connect to mongodb

connectMongoDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on PORT: ${port}`);
    });
    console.log("MongoDb Connected Successfully");
})
.catch((err)=>{
    console.log("Failded to connect with Mongodb ERROR:",err);
    // process.exit(1);
});


app.get('/',(req,res)=>{
    res.send("The server is running");
});