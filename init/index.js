const mongoose = require('mongoose');
const initData = require('./data.js');  
const Listing = require('../models/listing.js');

const MONGO_URI = 'mongodb://127.0.0.1:27017/wanderlust';

main()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
}

const initDB = async () => {
  try {
    // 👉 1. clear old data
    await Listing.deleteMany({});
    console.log('Cleared existing listings.');

    // 👉 2. owner add karo
    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: '69c053e9bc506d4d7dc3ae67'
    }));

    // 👉 3. insert correct data
    await Listing.insertMany(updatedData);

    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

initDB();