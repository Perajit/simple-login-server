import express from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRouter from './auth/router';
import { logger } from './logger';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
const port = 6060;
const corsOrigin = process.env.CLIENT_APP_ORIGIN;
const corsOptions: CorsOptions = {
  origin: corsOrigin,
  preflightContinue: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
};
const corsOptionsWithCredential: CorsOptions = {
  ...corsOptions,
  credentials: true,
};

app.options('*', cors(corsOptions));
authRouter.use(cors(corsOptions));
app.use(cors(corsOptionsWithCredential));

// requests / response processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// logging
app.use(morgan('combined', {
  stream: {
    write: text => logger.info(text),
  },
}));

// routes
app.use('/auth', authRouter);
app.get('/test', (req, res) => res.json({ message: 'ok' }));

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
