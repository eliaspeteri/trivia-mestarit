import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger';
import UserModel from '../models/user';
import { User } from '../types';

const router: Router = Router();

// Get all users
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users: User[] = (await UserModel.find({})) as User[];
  logger.info('fetched all users!');
  res.json(users);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const user: User | null = (await UserModel.findById(
    req.params.id
  )) as User | null;
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
    const user = new UserModel({
      username: username,
      passwordHash
    });

    await user.save();

    res.json({ message: `User '${username}' added successfully.` });
  } catch (error) {
    res.status(400).send({ error: 'Unable to post a new user.' });
    logger.error((error as any).message);
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await UserModel.findByIdAndRemove(req.params.id);
    res.status(204);
    logger.info(`removed ${req.params.id}`);
  } catch (error) {
    res.json({ error: 'User not found' });
    logger.error((error as any).message);
  }
});

export default router;
