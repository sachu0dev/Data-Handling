# Data Handling Task for Grovyo

## Task Overview
This project involves generating a large dataset, manipulating it, loading it into a database, and performing query performance benchmarks using JavaScript and MongoDB.

## Requirements
- Node.js
- npm
- MongoDB

## Installation

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

## Usage

1. **Run the Data Processing Task**
    To start the data generation, manipulation, loading, and querying processes, use the following command:
    ```bash
    npm start
    ```

    Alternatively, for development purposes, you can use:
    ```bash
    npm run dev
    ```

## Project Structure
.

├── src

│ └── utils

│ ├── datagenration.js

│ ├── datamanupulation.js

│ └── dataquery.js

├── app.js

├── package.json

└── README.md


### Detailed Steps

1. **Data Generation**:
    - The script generates 1 billion rows of data using faker.js and stores it in `data.json`.

2. **Data Manipulation**:
    - The script removes a specific category of similar names from the dataset and saves the modified data in `data2.json`.

3. **Data Loading**:
    - The script loads the modified dataset into a MongoDB database.

4. **Query Execution**:
    - The script performs and benchmarks various queries on the dataset.

## Scripts

- **start**: Runs the main data processing task.
- **dev**: Runs the task in development mode with nodemon.
- **test**: Placeholder for future tests.

## Dependencies

- **mongoose**: ^8.5.1
- **@faker-js/faker**: ^8.4.1

## DevDependencies

- **nodemon**: For development purposes to automatically restart the node application.

## Code Explanation

The main execution is handled in `app.js`, which performs the following steps:
1. Generates 1 billion rows of data using `generateData`.
2. Removes a specific category of names from the data using `removeKeys`.
3. Loads the modified data into MongoDB using `loadData`.
4. Performs a query on the dataset and benchmarks the execution time using `performQuery`.

The utility functions are modularized into separate files under the `src/utils` directory for better maintainability and clarity.

