import mongoose from "module";

const connectDb= async ()=>{
    mongoose.connection.on('connected',()=>{
            console.log('DB connected');
            
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/E-book_e_commerce`)
}

export default connectDb