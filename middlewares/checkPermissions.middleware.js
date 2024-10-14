const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];
    
    // Allow all operations if the user is a Super Admin
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
    
    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
    }

    next();
  };
};

module.exports = { checkPermissions };
