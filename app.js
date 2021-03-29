const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const muralRouter = require('./routes/muralRouter');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views')));
app.use('/', userRouter);
app.use('/mural', muralRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server on");
})