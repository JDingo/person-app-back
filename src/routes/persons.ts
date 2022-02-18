import express from 'express';
import personService from '../services/personService';
import { NewPerson, Person } from '../types';

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
    const newPerson: NewPerson = personService.validateNewPerson(personData);
    personService.addPerson(newPerson).then(addedPerson => {
      res.json(addedPerson);
    }).catch(error => {
      console.error(error);
      res.sendStatus(404);
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

router.put('/:id', (req, res) => {
  try {
    const personData = req.body as Person;
    const editPerson = personService.validatePerson(personData);
    personService.addPerson(editPerson).then(editedPerson => {
      res.json(editedPerson);
    }).catch(error => {
      console.log(error);
      res.sendStatus(404);
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

router.delete('/:id', (req, res) => {
  try {
    personService.removePerson(req.params.id).then(() => {
      res.sendStatus(204);
    }).catch(error => {
      console.log(error);
      res.sendStatus(404);
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