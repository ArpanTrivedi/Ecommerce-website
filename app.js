require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose');

//mongodb connect
mongoose.connect(process.env.DATABASE, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
)
.then(()=>{
    console.log(`DB CONNECTED`);
});


//routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoute=require("./routes/product");
const orderRoute=require("./routes/order");

//using of thr routes
app.use("/api",authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoute);
app.use('/api',orderRoute);


const port=process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});