const express = require('express');

const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      image: faker.image.url(),
    });
  }
  res.json(users);
});

module.exports = router;
