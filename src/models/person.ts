import mongoose from 'mongoose';
import { Person } from '../types';
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

if (!url) {
  console.error("Invalid url");
} else {
  mongoose
  .connect(url)
  .then(_result => { console.log('connected to MongoDB'); })
  .catch((error) => { console.log('error connecting to MongoDB:', error.message); });
}

const personSchema = new mongoose.Schema<Person>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
});

interface PersonDocument {
  firstName: string;
  lastName: string;
  age: number;
  id: string;
  _id?: object;
  __v?: number;
}

personSchema.set('toJSON', {
  transform: (_document, returnedObject: PersonDocument) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const PersonModel = mongoose.model<Person>('Person', personSchema);

export default PersonModel;