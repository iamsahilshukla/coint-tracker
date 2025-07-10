import express from 'express';
import path from 'path';
import coins from './src/coins';

const app = express();
app.set('trust proxy', true); // trust proxy for render

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware to parse JSON requests
app.use(express.json());

const router = express.Router();

router.get('/', (req, res): void => {
  res.render('index');
});

app.use('/', router);
app.use('/coins', coins);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
