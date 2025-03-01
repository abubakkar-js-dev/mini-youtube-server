import mongoose from  'mongoose';
import { DB_NAME } from '../constants';



const connectMongoDb = async()=>{
    try{
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected HOST: ${connectionInstant.connection.host}`);
        console.log('Database name:',connectionInstant.connection.db.databaseName);
    }catch(err){
        console.log("Mongodb connection ERROR:",err);
        process.exit(1);
    }
}



export default connectMongoDb;