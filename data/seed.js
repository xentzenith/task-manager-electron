const fs = require('fs');
const path = require('path');

// Path to the database file
const dbPath = path.join(__dirname, 'database.json');

// Sample data to seed the database with
const sampleTasks = [
  {
    id: '1',
    name: 'Task 1',
    description: 'Description for Task 1',
    priority: 'High',
    dueDate: Date.now() + 43200000, // Timestamp for 12 hours from now
    completed: false
  },
  {
    id: '2',
    name: 'Task 2',
    description: 'Description for Task 2',
    priority: 'Medium',
    dueDate: Date.now() + 86400000, // Timestamp for tomorrow
    completed: false
  },
  {
    id: '3',
    name: 'Task 3',
    description: 'Description for Task 3',
    priority: 'Low',
    dueDate: Date.now() + 2 * 86400000, // Timestamp for day after tomorrow
    completed: false
  }
];

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
  // Write the sample data to the database file
  fs.writeFileSync(dbPath, JSON.stringify(sampleTasks, null, 2));
  console.log('Database seeded with initial data.');
} else {
  console.log('Database already exists. No seeding needed.');
}
