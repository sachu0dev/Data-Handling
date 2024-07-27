import fs from 'fs';
import { connectDB } from './features.js';
import { Person } from '../model/model.js';
import JSONStream from 'JSONStream'; // Ensure to install this
const url = 'mongodb://localhost:27017/bigDataDB';

async function loadData() {
  let db;
  try {
    db = await connectDB(url);
    const fileStream = fs.createReadStream('data2.json');
    const jsonStream = JSONStream.parse('*'); // Parsing the whole file

    const start = performance.now();

    let batch = [];
    const batchSize = 10000; 

    fileStream.pipe(jsonStream);

    jsonStream.on('data', async (doc) => {
      batch.push(doc);
      if (batch.length >= batchSize) {
        jsonStream.pause(); // Pause the stream while processing the batch
        await Person.insertMany(batch, { ordered: false });
        batch = [];
        jsonStream.resume(); // Resume the stream
      }
    });

    jsonStream.on('end', async () => {
      if (batch.length > 0) {
        await Person.insertMany(batch, { ordered: false });
      }
      const end = performance.now();
      console.log(`Data loading time: ${end - start} ms`);
    });

    jsonStream.on('error', (error) => {
      console.error('Error processing stream:', error);
    });

    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
    });
    
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    if (db) await db.disconnect();
  }
}

async function performQuery(key, value) {
  let db;
  try {
    db = await connectDB(url);
    const start = performance.now();

    const query = { [key]: value };
    const count = await Person.countDocuments(query);

    const end = performance.now();
    console.log(`Query execution time: ${end - start} ms`);
    console.log(`Results found: ${count}`);

    return count;
  } catch (error) {
    console.error('Error performing query:', error);
  } finally {
    if (db) await db.disconnect();
  }
}

export { loadData, performQuery };
