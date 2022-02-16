import personData from '../../data/persons.json';

import { Person } from '../types';

const getPersons = (): Array<Person> => {
  return personData;
};

const addPerson = () => {
  return null;
};

export default {
  getPersons,
  addPerson
};