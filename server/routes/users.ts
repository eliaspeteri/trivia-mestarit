import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

const router: Router = Router();

// Get all users
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find({});
  console.log('fetched all users!');
  res.json(users);
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const user = User.findById(req.params.id);
  user ? res.json(user) : res.sendStatus(404);
});

// Add new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(body.password, saltRounds);
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

// Delete a user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204);
  } catch (e) {
    res.json({ error: 'User not found' });
  }
});

export default router;
