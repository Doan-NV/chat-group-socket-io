const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit');
const morgan = require('morgan')

const { responseWrapper, exceptionHandler } = require('./middlewares');
const { authRouter, userRouter, messageRouter, chatRouter } = require('./routers');
const { connectDB } = require('./utils');

connectDB();

const app = express();

const logger = morgan('combined');
app.use(logger);

app.use(helmet());
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.use(responseWrapper);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/chat', chatRouter);
app.use('/api/user', userRouter);

// Exception Handler
app.use(exceptionHandler);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


module.exports = app;
