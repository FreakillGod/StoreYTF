require('dotenv').config()
const express= require('express');
const cors=require('cors');

const app=express();

const connectDB= require('./DB/mongo');

const port=process.env.PORT || 5453

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

const admin=require('./router/admin');
const product=require('./router/product');

const pageNotFound=require('./middleware/pageNotFound');

app.use('/api/v1/auth',admin);
app.use('/api/v1/product',product);

app.get('/',(req,res)=>{
    res.send('<h1> Welcome </h1>')
})

app.use(pageNotFound);

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}
start()