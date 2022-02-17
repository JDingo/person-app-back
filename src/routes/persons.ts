import express from 'express';
import personService from '../services/personService';
import { NewPerson } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log("All fetched!");
  res.send(personService.getPersons());
});

router.post('/', (req, res) => {
  try {
    const personData = req.body as NewPerson;
    const newPerson: NewPerson = personService.validatePersonData(personData);
    const addedPerson = personService.addPerson(newPerson);

    console.log("Person", addedPerson, "added!");

    res.json(addedPerson);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    else {
      res.status(400);
    }
  }
});

export default router;