import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../utils/response/responseHandler';
import { hasPermission, UserRole } from '../utils/jwt';

export function roleAuth(requiredRole: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: { role?: UserRole } }).user;

    if (!user) {
      return ResponseHandler.error(res, {
        message: 'Authentication required',
        statusCode: 401,
      });
    }

    if (!user.role || !hasPermission(user.role, requiredRole)) {
      return ResponseHandler.error(res, {
        message: 'Insufficient permissions',
        statusCode: 403,
      });
    }

    next();
  };
}
