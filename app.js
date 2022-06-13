const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/health', (req, res) => res.status(200).send('life assistant service'));

//router 

const managerUserRouter = require('./routers/manger-user.router');
const managerMovieRouter = require('./routers/manager-movie.router');

app.use('/api/QuanLyPhim', managerMovieRouter);
app.use('/api/QuanLyNguoiDung', managerUserRouter);

module.exports = app;