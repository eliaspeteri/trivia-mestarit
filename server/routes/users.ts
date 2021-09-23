import express from 'express';

import bcrypt from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const User = require('../models/user');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const users = await User.find({});
  console.log('fetched all users!');
  res.json(users);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  try {
    console.log(body);
    const user = new User({
      username: body.username,
      passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser.toJSON());
  } catch (e) {
    res.status(400).send({ error: 'Unable to post a new user.' });
  }
});

export default router;
