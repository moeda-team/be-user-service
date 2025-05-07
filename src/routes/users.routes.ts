import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateCreateUser, validateUpdateUser } from '../middleware';
import { HealthController } from '../controllers/health.controller';
import { basicAuth } from '../middleware';

const router = Router();
const userController = new UserController();
const healthController = new HealthController();

router.get('/health', basicAuth, healthController.check);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateCreateUser, userController.createUser);
router.put('/:id', validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
