import { v4 as uuid } from 'uuid';

import { NewPerson, Person } from '../types';
import { isNumber, isString } from '../utils';

import PersonModel from '../models/person';

const validateNewPerson = ({ firstName, lastName, age }: { firstName: unknown, lastName: unknown, age: unknown }): NewPerson => {
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

const validatePerson = ({ firstName, lastName, age, id }: { firstName: unknown, lastName: unknown, age: unknown, id: unknown }): Person => {
  if (!firstName || !lastName || !age || !id ) {
    throw new Error('Missing data');
  }

  if (!isString(firstName) || !isString(lastName) || !isNumber(age) || !isString(id)) {
    throw new Error('Malformed data');
  }

  return ({
    firstName,
    lastName,
    age,
    id
  });
};

const getPersons = async (): Promise<Array<Person>> => {
  const persons = await PersonModel.find({});
  return persons;
};

const getPerson = async (id: string): Promise<Person> => {
  const person = await PersonModel.findById(id);
  
  if (!person) {
    throw new Error("Not found!");
  }

  return person;
};

const addPerson = async (newPersonData: NewPerson): Promise<Person> => {
  const newPerson: Person = { ...newPersonData, id: uuid() };
  const newPersonModel = new PersonModel(newPerson);

  const addedPerson = await newPersonModel.save();
  return addedPerson;
};

const editPerson = async (editPersonData: Person): Promise<Person> => {
  const editedPerson = await PersonModel.findByIdAndUpdate(editPersonData.id, editPersonData, { new: true });

  if (!editedPerson) {
    throw new Error("Not found!");
  }

  return editedPerson;
};

const removePerson = async (id: string): Promise<Person> => {
  const removedPerson = await PersonModel.findByIdAndRemove(id);

  if (!removedPerson) {
    throw new Error("Not found!");
  }

  return removedPerson;
};

export default {
  getPersons,
  getPerson,
  editPerson,
  addPerson,
  removePerson,
  validatePerson,
  validateNewPerson
};