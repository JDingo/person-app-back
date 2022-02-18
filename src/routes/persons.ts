import express from 'express';
import personService from '../services/personService';
import { NewPerson } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  personService.getPersons()
    .then(persons => {
      res.json(persons);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(404);
    });
});

router.get('/:id', (req, res) => {
  personService.getPerson(req.params.id).then(person => {
    res.json(person);
  }).catch(error => {
    console.error(error);
    res.sendStatus(404);
  });
});

router.post('/', (req, res) => {
  try {
    const personData = req.body as NewPerson;
    const newPerson: NewPerson = personService.validatePersonData(personData);
    personService.addPerson(newPerson).then(addedPerson => {
      res.json(addedPerson);
    }).catch(e => {
      console.log(e);
    });
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    else {
      res.status(400);
    }
  }
});

export default router;