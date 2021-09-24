import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';
import User from '../models/user';

const router: Router = Router();

// Get all users
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users: any = (await User.find({})) as any;
  logger.info('fetched all users!');
  res.json(users);
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const user: any = (await User.findById(req.params.id)) as any;
  user ? res.json(user) : res.sendStatus(404);
  logger.info(`fetched ${req.params.id}`);
});

// Add new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);
  try {
    logger.info(req.body);
    const user = new User({
      username: username,
      passwordHash
    });

    const savedUser: any = (await user.save()) as any;

    res.json(savedUser.toJSON());
  } catch (error) {
    res.status(400).send({ error: 'Unable to post a new user.' });
    logger.error((error as any).message);
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204);
    logger.info(`removed ${req.params.id}`);
  } catch (error) {
    res.json({ error: 'User not found' });
    logger.error((error as any).message);
  }
});

export default router;
