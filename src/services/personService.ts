import personData from '../../data/persons.json';
import { v4 as uuid } from 'uuid';

import { NewPerson, Person } from '../types';
import { isNumber, isString } from '../utils';

const validatePersonData = ({ firstName, lastName, age }: { firstName: unknown, lastName: unknown, age: unknown }): NewPerson => {
  if (!firstName || !lastName || !age) {
    throw new Error('Missing data');
  }

  if (!isString(firstName) || !isString(lastName)|| !isNumber(age)) {
    throw new Error('Malformed data');
  }

  return ({
    firstName,
    lastName,
    age
  });
};

const getPersons = (): Array<Person> => {
  return personData;
};

const addPerson = (newPerson: NewPerson) => {
  const addedPerson: Person = {...newPerson, id: uuid() };
  personData.push(addedPerson);
  return addedPerson;
};

export default {
  getPersons,
  addPerson,
  validatePersonData
};