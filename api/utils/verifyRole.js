import { errorHandler } from './error.js';

export const verifySuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return next(errorHandler(403, 'Forbidden - Not a Super Admin'));
  }
  next();
};

export const verifyAdminOrSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return next(errorHandler(403, 'Forbidden - Not an Admin or Super Admin'));
  }
  next();
};
