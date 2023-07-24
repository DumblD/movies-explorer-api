require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/error');

const app = express();

app.use(helmet());

mongoose.connect(`mongodb://${process.env.NODE_ENV === 'production' ? process.env.DOMAIN : '127.0.0.1:27017'}/bitfilmsdb`, {
  useNewUrlParser: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(cors({
  origin: 'https://movies-search.nomoredomains.xyz',
  credentials: true,
}));

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening port 3000');
});
