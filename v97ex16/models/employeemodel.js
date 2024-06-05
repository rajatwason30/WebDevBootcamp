import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  salary: Number,
  language: String,
  city: String,
  isManager: Boolean
});

export const Employee = mongoose.model('Employee',employeeSchema);