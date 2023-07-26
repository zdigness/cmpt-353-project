const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')

app.use('/users', usersRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
