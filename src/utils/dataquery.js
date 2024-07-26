import fs from 'fs';
import { connectDB } from './features.js';
import { Person } from '../model/model.js';
import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/bigDataDB'; 
async function loadData() {
  try {
    await connectDB(url); 
    
    const data = JSON.parse(fs.readFileSync('data2.json', 'utf8'));
    
    const start = performance.now();
    await Person.insertMany(data);
    const end = performance.now();
    
    console.log(`Data loading time: ${end - start} ms`);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    await mongoose.disconnect(); 
  }
}

async function performQuery(key, value) {
  try {
    await connectDB(url);
    
    const start = performance.now();
    const query = { [key]: value }; 
    const result = await Person.find(query).exec();
    const end = performance.now();
    
    console.log(`Query execution time: ${end - start} ms`);
    console.log(`Results found: ${result.length}`);
  } catch (error) {
    console.error('Error performing query:', error);
  } finally {
    await mongoose.disconnect(); 
  }
}



export { loadData, performQuery };
