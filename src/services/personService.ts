import { v4 as uuid } from 'uuid';

import { NewPerson, Person } from '../types';
import { isNumber, isString } from '../utils';

import PersonModel from '../models/person';

const validatePersonData = ({ firstName, lastName, age }: { firstName: unknown, lastName: unknown, age: unknown }): NewPerson => {
  if (!firstName || !lastName || !age) {
    throw new Error('Missing data');
  }

  if (!isString(firstName) || !isString(lastName) || !isNumber(age)) {
    throw new Error('Malformed data');
  }

  return ({
    firstName,
    lastName,
    age
  });
};

const getPersons = async (): Promise<Array<Person>> => {
  const persons = await PersonModel.find({});
  return persons;
};

const addPerson = async (newPersonData: NewPerson): Promise<Person> => {
  const newPerson: Person = { ...newPersonData, id: uuid() };
  const newPersonModel = new PersonModel(newPerson);

  const addedPerson = await newPersonModel.save();
  return addedPerson;
};

export default {
  getPersons,
  addPerson,
  validatePersonData
};