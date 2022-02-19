import express from 'express';
import cors from 'cors';
import personRouter from './routes/persons';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const PORT = process.env.PORT;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/persons', personRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});