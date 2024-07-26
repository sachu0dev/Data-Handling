import fs from 'fs';
import { faker } from '@faker-js/faker';

const generateData = (numRows) => {
  const writeStream = fs.createWriteStream('data.json');
  
  writeStream.write('[');
  
  for (let i = 0; i < numRows; i++) {
    const person = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      age: faker.number.int({ min: 18, max: 65 })
    };
    
    writeStream.write(JSON.stringify(person));
    
    if (i < numRows - 1) {
      writeStream.write(',');
    }
    
    if (i % 1000000 === 0) {
      console.log(`Generated ${i} rows`);
    }
  }
  
  writeStream.write(']');
  writeStream.end();
  console.log(`Data generation complete. ${numRows} rows written to data.json`);
};

export  {generateData}