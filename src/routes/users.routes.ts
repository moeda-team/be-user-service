import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateCreateUser, validateUpdateUser } from '../middleware';
import { HealthController } from '../controllers/health.controller';
import { basicAuth } from '../middleware';
import { AuthController } from '../controllers/auth.controller';
import { jwtAuth } from '../middleware/jwtAuth.middleware';

const router = Router();
const userController = new UserController();
const healthController = new HealthController();
const authController = new AuthController();

router.get('/health', basicAuth, healthController.check);
router.get('/', jwtAuth, userController.getAllUsers);
router.get('/:id', jwtAuth, userController.getUserById);
router.post('/', jwtAuth, validateCreateUser, userController.createUser);
router.put('/:id', jwtAuth, validateUpdateUser, userController.updateUser);
router.delete('/:id', jwtAuth, userController.deleteUser);
router.post('/login', authController.login);

export default router;
