import express from 'express';
import personService from '../services/personService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(personService.getPersons());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;