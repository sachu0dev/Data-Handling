import mongoose from "mongoose";

const Person = mongoose.model(
  "Person",
  {
    name: String,
    email: String,
    address: String,
    age: Number
  }
);

export { Person };
