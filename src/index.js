const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.c3c55nt.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

//Settings
app.set('port', process.env.PORT || 4000);
app.use(cors());

//Middlewares
app.use(express.json({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

app.use('/api', require('./routes/api'));

app.listen(app.get('port'), () => {
  console.log('Servidor Funcionando');
});
