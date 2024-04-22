const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');



const app = express();

// MiddleWares:
app.use(express.json({extended: true}));

app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)

    next()
})

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ErrorHandler_Middlewares:
app.use(notFound);
app.use(errorHandler);



// Connecting to DATABASE:
connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch(err => {
    console.log(err)
})


